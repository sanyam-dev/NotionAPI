const dotenv = require('dotenv').config(); 
const {Client } = require('@notionhq/client');

const notion = new Client({
	auth : process.env.NOTION_TOKEN,
})

const database_id = process.env.NOTION_DATABASE_ID; 

module.exports = async function getVideos (){
	const payload = {
		database_id, 
		filter: {
			property : 'Publish', 
			checkbox : {
				equals: true,
			}
		},
		sorts: [
			{
				property : 'Date', 
				direction : 'descending',
			}
		]
		 
	}
	const { results } = await notion.databases.query(payload);
	const videos = results.map(page =>{
	
			const res = {
				id: page.id, 
				title: page.properties.Name.title[0].text.content,
				date: page.properties.Date.date.start,
				tags: page.properties.Tags.multi_select[0].name, 
				description: page.properties.Description.rich_text[0].text.content  
			}
			console.log(res); 
			return res;
			
	})

	return videos
}

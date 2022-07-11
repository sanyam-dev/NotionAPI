const videosEl = document.querySelector('#videos');
const loadingEl = document.querySelector('#loading'); 
let loading = false; 
const getVideosFromBackEnd = async () => {
	loading = true
	const res = await fetch('http://localhost:1024/videos');
	const data = await res.json()
	loading = false; 
	return data;  
}

const addVideosToDOM = async () => {
	const videos = await getVideosFromBackEnd();
	if(!loading) loadingEl.innerHTML = ''
	videos.forEach(video => {
			const div = document.createElement('div'); 
			div.className = 'video';
			div.innerHTML = `
				<h3>${video?.title}</h3>
				<ul>
					<li>
						<strong> Release Date </strong> ${video?.date}
					</li>
					<li>
						<strong> Description </strong> ${video?.description}
					</li>
				</ul>
				<div class="tags">${video?.tags}</div>
			`
			videosEl.appendChild(div);

	})
}
addVideosToDOM(); 
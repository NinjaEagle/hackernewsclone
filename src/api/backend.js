import axios from 'axios'

export default axios.create({
	mode: 'cors',
	baseURL: 'https://us-central1-hackernewsclone-bc4a1.cloudfunctions.net/api',
	//baseURL: 'localhost:5001',
	// headers: {
	//     Authorization: ''
	// }
})

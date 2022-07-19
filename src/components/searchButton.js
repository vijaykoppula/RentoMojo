import Header from './Header'
import React,{useState} from 'react'
import {} from 'react-bootstrap'
function searchButton(){
	const [data,setData]=useState([])
	async function search(key)
	{
		console.warn(key)
		let result = await fetch("https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json"+key);

		result=await result.json();
		console.warn(result)
		setData(result);
	}
	return (
		<div>
			<Header />
				<div className='col'>
					<h1>Search Game</h1>
					<br />
					<input type='text' onChange={(e)=>search(e.target.value)} className='form-control' placeholder='Search Product'/>
					<table>
						<tr>
							<td>Title</td>
							<td>Platform</td>
							<td>score</td>
							<td>genre</td>
							<td>editor choice</td>
						</tr>
						{
							data.map((item)=>
								<tr>
									<td>{item.title}</td>
									<td>{item.platofrm}</td>
									<td>{item.score}</td>
									<td>{item.genre}</td>
									<td>{item.editors_choice}</td>
									
								</tr>
							)
						}
					</table>
				</div>
		</div>
	)
}
export default searchButton;

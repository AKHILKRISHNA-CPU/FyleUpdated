import React, { useState, useEffect } from "react";
import "./RepoPage.css";
import { Link, useParams } from "react-router-dom";
import axios from "../../axios";
import Repo from "../Repo-Call/Repo-call";
const User = () => {
const { login } = useParams();
const [userInfo, setUserInfo] = useState({});
const [tech, settech] = useState([]);
const [currentpage, setCurrentPage] = useState(0)
const [activepage, setActivetPage] = useState(0)
const [perPage] = useState(10);
const [off, set] = useState(0);
const pageNumbers = [];
for (let i = 0; i<Math.ceil(tech.length)/perPage; i++){
pageNumbers.push(i)
}
const handleChange = (easy, pageno) => {
setCurrentPage(Math.ceil(tech.length/perPage));
const selectedPage = pageno;
setActivetPage(pageno);
set(selectedPage*perPage);
}
const slice = tech.slice(off, off + perPage)
useEffect(() => {
const fetchUserInformation = async () => {
try {
const response = await Promise.all([
axios.get(`/users/${login}`),
axios.get(`/users/${login}/repos`),
]);
setUserInfo(response[0].data);
settech(response[1].data);
} catch (error) {
console.error(error);
}
};
fetchUserInformation();
}, []);
return (
<div className="box">
<Link to="/" className="searchother">
Searchother
</Link>
<div className="info">
<div className="picture">
<img src={userInfo?.avatar_url} />
</div>
<div className="userdetails">
<h1>{userInfo?.name}</h1>
<p>{userInfo?.bio}</p>
<div className="more-data">
{userInfo?.location && (
<p>
{userInfo?.location}
</p>
)}
<p>
<a href={userInfo?.html_url}>View GitHub Profile</a>
</p>
</div>
</div>
</div>
{/* Pagination start */}
<center>
<div className="pagination">
{pageNumbers.map(page => (  
<button onClick={(event) => handleChange(event,page)}><span key={page} className={(page)==(activepage) ? 'page-link active' : 'page-link' }>  
{page+1}</span>
</button>
))} 
</div>
</center>
{/* Paination ends */}
{tech ? (
slice.map((repo) => {
return <Repo repo={repo} key={repo.id} />;
})
) : (
<h3>No Data</h3>
)}
</div>
);
};
export default User;
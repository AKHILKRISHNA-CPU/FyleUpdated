import React, { useState, useEffect } from "react";
import "./main.css";
import axios from "../../axios";
import User from "../User-call/User-call";
import userimage from "../../images/userimage.png";
const Profile = () => {
const [identity, setidentity] = useState("");
const [man, setMan] = useState([]);
const [page, Page] = useState(1);
const [fix, setfix] = useState(10);
const [loading, setLoading] = useState(0);
const [message, setmessage] = useState("");

const handleidentityInput = (easy) => {
const value = easy.target.value;
setidentity(value);
};
const fetchUsers = async () => {
try {
const { data } = await axios.get("/search/users?q=" + identity, {
params: {
page,
per_page: fix,
},
});
return data?.items;
} catch (error) {
console.error(error);
return null;
}
};
const handleSearchUsers = async (easy) => {
setLoading(1)
easy.preventDefault();
if (identity) {

const items = await fetchUsers();
if(items)
{
setLoading(0)
}
setMan(items);
} else {
setmessage("Please enter name...");
}
};
useEffect(() => {
const displayUsersOnChange = async () => {
if (identity) {
const items = await fetchUsers();
setMan(items);
}
};
displayUsersOnChange();
}, [page, fix]);

return (
// Search Bar starts
<center>
<div className="container">
<div className="datasearch">
<h2><img src={userimage} alt="" /></h2>
<form >
<input value={identity} onChange={handleidentityInput} type="text" />
<button onClick={handleSearchUsers}>Search</button>
</form>
</div>
{/* Search Bar ends */}
{/* Loader */}
{loading==1 ? <div className="lds-spinner">Loading...<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> : '' }
{/* Loader ends */}
{/* UserData Representation */}
<div className="userdata">
{man ? (
man.map((user) => {
return <User user={user} key={user.id} />;
})
) : (
<h2>No Data Found.......</h2>
)}
</div>
</div>
</center>
// User Data Ends
);
};

export default Profile;

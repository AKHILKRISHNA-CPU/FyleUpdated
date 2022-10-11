import React from "react";
import "./Repo-call.css";
const Repo = ({ repo }) => {
const { name, html_url, description, language } = repo;
return (
<div className="repo">
<h3>
<a>{name}</a>
</h3>
<p>{description}</p>
{language && <small> {language}</small>}
</div>
);
};

export default Repo;

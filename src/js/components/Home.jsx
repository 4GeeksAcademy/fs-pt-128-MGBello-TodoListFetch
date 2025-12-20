import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { Header } from "./Header";
import { ListSection } from "./ListSection";
import { Footer } from "./Footer";


//create your first component
const Home = () => {
	const [todoList, setTodoList] = useState([])
	const [list, setList] = useState(" ")

	return (
		<div className="container d-flex flex-column align-items-center justify-content-center">
			<div className="cardContainer shadow-custom w-100 d-flex flex-column align-items-center">
				<Header todoList={todoList} setTodoList={setTodoList} list={list} setList={setList} />
				<ListSection todoList={todoList} setTodoList={setTodoList} list={list} setList={setList} />
				<Footer todoList={todoList} />
			</div>
		</div>
	);
};

export default Home;
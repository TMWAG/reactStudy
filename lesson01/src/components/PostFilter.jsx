import React from "react";
import MyInput from './UI/input/MyInput';
import MySelect from './UI/select/MySelect'

const PostFilter = ({filter, setFilter}) =>{
    return(
        <div>
            <MyInput
            value={filter.query}
            onChange={e => setFilter({...filter, query:e.target.value})}
            placeholder="Search 🔎"
            />
            <MySelect
            value={filter.sort}
            onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
            defaultOption="Sort By"
            options={[
                {value: "title", name: "By Name"},
                {value: "body", name:"By Contents"}
            ]}
            />
        </div>
    );
};

export default PostFilter;
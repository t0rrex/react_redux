import React from 'react';
import {render} from 'react-dom';
import {articles} from "./fixtures";
import ArticleList from "./ArticleList";

render(<ArticleList articles={articles} />, document.getElementById('container'));
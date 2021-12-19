import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

//writing the GitHubContext give us access to two component:
// provider and consumer - GitHubContext.provider

const GithubProvide = ({children}) => {
    return ( <GithubContext.Provider value={
        "hello"
    }>{children}</GithubContext.Provider>
    );
};

export{GithubProvide, GithubContext}

import React from 'react';

const AppContext = React.createContext();

class MyProvider extends React.Component{
    state = {
        user: []
    };

    updateUser = (param) => {
        this.setState({user: param});
    }

    render() {
        return (
        <AppContext.Provider value={{context: this.state}}>
          {this.props.children}
        </AppContext.Provider>
        );
      }
}

export {MyProvider, AppContext};



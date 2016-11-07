import React from "react";
import {connect} from 'react-redux';
import { History } from 'react-router';

export default function requireAuth(Component)
{

  class AuthenticatedComponent extends React.Component{

  	componentWillMount()
  	{
  				this.checkCredentials(this.props.authToken)

  	}

  	componentWillReceiveProps(nextProps){
   	this.checkCredentials(nextProps.authToken);
  	}

  checkCredentials (authToken) {
      if (!authToken) {
        const storageToken = window.localStorage.getItem('authToken')
        console.log(storageToken)
        if (!storageToken) {
          this.redirectToLogin()
        } else {
          this.props.setAuthToken(storageToken)
        }
      }
    }

    redirectToLogin (){
     this.props.history.push("/login")
    }


    render () {
      return (
        <div>
          {this.props.authToken
            ? <Component {...this.props} />
            : null // You can add a spinner Component here
          }
        </div>
      )
    }
  }


 const mapStateToProps = (state) => ({
    authToken: state.auth.token.user
  })
  const mapDispatchToProps = (dispatch) => {
    return {
      setAuthToken: (authToken) => {
        dispatch(setAuthToken(authToken))
      }
    }
  }
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(AuthenticatedComponent)


}

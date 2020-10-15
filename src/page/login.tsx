import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import api from '../api';
import _ from "lodash/fp";
import { useForm } from "react-hook-form";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';



// STYLE CSS
const loginStyles = makeStyles((theme) => ({
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    buttonSubmit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

// INTERFACE
interface State {
    userName: string, 
    password: any,
    showPassword: boolean,
    remember: boolean
}


const Login = () => {
    const classes = loginStyles();
    let history = useHistory();
    const {register, handleSubmit, watch, errors} = useForm<State>();
    const [values, setValues] = useState<State>({
        userName: '',
        password: '',
        showPassword: false,
        remember: false
    });

    const pageChange =() => {
        let path = "/admin/dashboard";
        history.push(path);
    }
    

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [e.target.name]: e.target.value});
    };

    const roleSelect = (props: any) => {
        console.log(props)
        let userType = props.tag

        // USER_TYPE LOCAL_STORAGE
        localStorage.setItem("user_type", userType);

        // ROLE_ID LOCAL_STORAGE
        localStorage.setItem("roleId", props.roleId)

        // ORGANIZATION LOCAL_STORAGE
        if (props.hasOwnProperty('organizationId')) {
            localStorage.setItem("organization", props.organizationId.id);
        } else {
            localStorage.removeItem("organization");
        }
    }




    const onSubmit = (data: State) => {
        let url = "/api/v1/auth/login"
        let requestData = {
            email: data.userName,
            password: data.password
        }
        api.post(url,requestData)
        .then((response) => {
            let local: any = response.data
            let userRoleSelected: any = local.user.userRole[0]

            // AUTH_TOKEN LOCAL_STORAGE
            localStorage.setItem('auth_token', local.authToken)

            // USER_INFO LOCAL_STORAGE
            localStorage.setItem('user_info', JSON.stringify(local.user))

            // USER_ID LOCAL_STORAGE
            localStorage.setItem('user_id', local.user.userId)

            // ROLE DETAILS LOCAL_STORAGE
            roleSelect(userRoleSelected)

            pageChange()

        })
        .catch((error) => {
                console.log(error)
        });
    }

   

    return (
        <div>

            <form className="classes.form" noValidate onSubmit={handleSubmit(onSubmit)}>

                <FormControl  required  margin="normal" fullWidth variant="outlined">
                    <InputLabel htmlFor="userName">Email address</InputLabel>
                    <OutlinedInput 
                    onChange={handleChange} 
                    name="userName" 
                    id="userName"  
                    label="Email address"
                    inputRef={register({required: true, pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i })} />
                    <FormHelperText id="component-error-text">
                        {_.get("userName.type", errors) === "required" && (
                            <span >This field is required</span>
                        )}
                    </FormHelperText>
                    <FormHelperText id="component-error-text">
                        {_.get("userName.type", errors) === "pattern" && (
                            <span>Alphabetical characters only</span>
                        )}
                    </FormHelperText>
                </FormControl>

                
                <FormControl required margin="normal" fullWidth  variant="outlined">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                    name="password" 
                    id="password" 
                    onChange={handleChange}
                    type={values.showPassword ? 'text' : 'password'}
                    inputRef={register({required: true})}
                    endAdornment={
                    <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                    </InputAdornment>
                }
                labelWidth={70}
                />
                <FormHelperText id="component-error-text">
                        {_.get("password.type", errors) === "required" && (
                            <span >This field is required</span>
                        )}
                </FormHelperText>
                </FormControl>
                <FormControlLabel
                    control={<Checkbox name="remember" color="primary" />}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.buttonSubmit}
                >
                    Sign In
                </Button>
            </form>
        </div>
    )
}

export default Login;
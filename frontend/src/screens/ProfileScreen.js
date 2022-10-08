import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../Store';

const ProfileScreen = () => {

    const { state} = useContext(Store);
    const { userInfo } = state;

    return (
        <div className="container-sm card p-4">
            <form className="row g-2 needs-validation">
                <div className="col-md-1"></div>
                <div className="col-md-10 mt-3 mb-2">
                    <h4 className="fw-bolder">Profile</h4>
                </div>
                <div className="col-md-1"></div>
                
                <div className="col-md-4 text-center">
                    <img src={process.env.PUBLIC_URL + "person-circle.svg"} alt="profile" style={{height: '100%', minHeight: '25vh'}}/>
                </div>
                <div className="col-md-8">
                    <div className="col-md-12 mb-2">
                       <p className="card-text fs-6"><span className="fw-semibold">Name: &nbsp;</span>{userInfo.name}</p>
                    </div>
                    <div className="col-md-12 mb-2">
                       <p className="card-text fs-6"><span className="fw-semibold">Email: &nbsp;</span>{userInfo.email}</p>
                    </div>
                    <div className="col-md-12 mb-2">
                       <p className="card-text fs-6"><span className="fw-semibold">ID: &nbsp;</span>#{userInfo._id}</p>
                    </div>
                    <br />
                    <div className="col-md-12 mb-1 ">
                        <h5 className="card-text fs-6"><Link className="text-indigo text-decoration-none" to="/edit-profile"><i class="bi bi-pencil-square"></i> &nbsp;  Update Profile</Link></h5>
                    </div>
                </div>            
            </form>
        </div>
    );
}

export default ProfileScreen;
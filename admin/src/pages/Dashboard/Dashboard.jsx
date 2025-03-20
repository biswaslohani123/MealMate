import React, { useContext, useEffect } from 'react';

import { assets } from '../../../../Frontend/src/assets/assets';
import { AdminContext } from '../../context/AdminContext.';

const Dashboard = () => {
    const { atoken, getDashData, dashdata } = useContext(AdminContext);

    useEffect(() => {
        if (atoken) {
            getDashData();
        }
    }, [atoken]);

  

    return (
        <div>
            {/* Orders Section */}
            <div>
                <img src={assets.bag_icon} alt="Orders" />
                <div>
                    <p>{dashdata.orders}</p>
                    <p>Orders</p>
                </div>
            </div>

            {/* Users Section */}
            <div>
                <img src={assets.profile_icon} alt="Users" />
                <div>
                    <p>{dashdata.users}</p>
                    <p>Users</p>
                </div>
            </div>

            {/* Latest Orders Section */}
            <div>
                <div>
                    <img src={assets.profile_icon} alt="Latest Orders" />
                    <p>Latest Orders</p>
                </div>

                <div>
                    {dashdata.latestorders && dashdata.latestorders.length > 0 ? (
                        dashdata.latestorders.map((item, index) =>   (
                            <div key={index}>
                                <img src={assets.bag_icon} alt="Order Icon" />
                                <div>
                                    {item.items.map((i)=>{
                                        return <div key={i._id}>
                                            <p>{i.name}</p>
                                        </div>
                                    })}  
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No recent orders found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

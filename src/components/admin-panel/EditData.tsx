import React from 'react';
import {Outlet} from "react-router-dom";

function EditData() {
    return (
        <div>
            Edit data
            <Outlet/>
        </div>
    );
}

export default EditData;
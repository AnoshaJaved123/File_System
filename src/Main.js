import React from 'react'
import File from './File'
import Navbar from './Navbar'

const Main = () => {
    return (
        <>
            <Navbar />
            <div className="s-layout">
                {/* Sidebar */}
                <div className="s-layout__sidebar">
                    <a className="s-sidebar__trigger" href="#0">
                        <i className="fa fa-bars" />
                    </a>
                    <nav className="s-sidebar__nav">
                        <ul>
                            <li>
                                <a className="s-sidebar__nav-link" href="#0">
                                    <i className="fa fa-home" /><em>Home</em>
                                </a>
                            </li>
                            <li>
                                <a className="s-sidebar__nav-link" href="#0">
                                    <i className="fa fa-user" /><em>My Profile</em>
                                </a>
                            </li>
                            <li>
                                <a className="s-sidebar__nav-link" href="#0">
                                    <i className="fa fa-camera" /><em>Camera</em>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                {/* Content */}
                <main className="s-layout__content">
                    {/* <h1>Full View, Please!</h1> */}
                    <File />
                </main>
            </div>
        </>


    )
}

export default Main

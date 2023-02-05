import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import img2 from './styles/doc.png'

const File = () => {
    const [name, setName] = useState([]);
    const [picURL, setpicURL] = useState('');
    const [showpreview, setshowpreview] = useState({ key: "", status: false })
    const navigate = useNavigate()

    const [item, setItem] = useState(null);
    useEffect(() => {
        console.log('use effect running')


        axios.get('http://localhost:5000/api/itemAuth/fectchitemall').then((res) => {
            setItem(res.data);
        });

        axios.get('http://localhost:5000/api/itemAuth/fectchiteminfo').then((response) => {
            setName(response.data);
            console.log('name', name)
        });


    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('picURL', picURL);
        console.log(formData)
        axios.post('http://localhost:5000/api/itemAuth/createitem', formData)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
        window.location.reload();
    }

    const handlePhoto = (e) => {
        e.preventDefault();
        setpicURL(e.target.files[0])
    }
    const handlepreview = (id) => {
        console.log(id)
        setshowpreview({ key: id, status: true })
        navigate('/preview', { state: id })
    }


    const deleteitem = async (id) => {
        const name = JSON.parse(JSON.stringify(id.id))
        console.log(name)

        const res = await fetch(`http://localhost:5000/api/itemAuth/deleteitem`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                id: name,
            }
        })
        const response = await res.json()

    }
    return (
        <div className="flex">
            <div className="upload">
                <form onSubmit={handleSubmit} encType='multipart/form-data'>
                    <input
                        type="file"
                        name="picURL"
                        onChange={handlePhoto}
                    />


                    <button
                        type="submit"
                        className="btn btn-primary mx-3"
                    >Upload</button>
                </form>
            </div>
            <div className="upload">

                {name && name.map((items) => <div className="card border-dark mb-3 mx-3" key={items.name} style={{ maxWidth: '15rem' }}>
                    <div className="row text-center mx-2">
                        <div className="col-md-12">
                            {items.extension == '.png' || items.extension == '.jpg' || items.extension == '.jpeg' || items.extension == '.webp' || items.extension == '.jpg' ? <img src={`http://localhost:5000/uploads/${items.name}`} className="card-img-top my-1 container shadow p-2 mb-3 bg-white rounded" alt="..." />
                                : <img src={img2} className="card-img-top my-1 container shadow p-2 mb-3 bg-white rounded" alt="..." />
                            }
                            <h6>Created at: {items.mtime}</h6>
                            <h6>Last Modified at: {items.mtime}</h6>
                            <h6>extension: {items.extension}</h6>
                            <h6>fileSizeInBytes: {items.fileSizeInBytes}</h6>
                        </div>
                    </div>

                    <div className="btn-group btn-group-sm mb-3 px-4 " role="group" aria-label="...">
                        <a href='#' type='button' onClick={() => { handlepreview({ id: items.name }) }} className="btn btn-sm btn-secondary" >Preview</a>
                        <a href='#' className="btn btn-sm btn-danger" onClick={() => { deleteitem({ id: items.name }); window.location.reload(); }} >Delete</a>

                    </div>
                </div>

                )}

            </div>
        </div>

    )
}

export default File

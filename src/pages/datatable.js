import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import Layout from "@/components/layout";

function Datatable() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("https://api.escuelajs.co/api/v1/products")
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            });
    }, []);

    const columns = [
        {
            name: "Title",
            selector: "title",
            sortable: true,
        },
        {
            name: "Price",
            selector: "price",
            sortable: true,
        },
        {
            name: "Category",
            selector: "category",
            sortable: true,
        },
        {
            name: "Image",
            selector: "images",
            sortable: true,
        },
        {
            name: "Action",
            selector: "action",
        },
    ];


    const rows = data.map((item) => ({
        title: item.title,
        price: item.price,
        category: item.category.name,
        images: <img src={item.images} width={100} height={90} style={{borderRadius: '20px' ,margin:'10px'}}/>,

        action: <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button type="button" class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Edit
            </button>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Edit </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Are sure you want to edit this?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <button class="btn btn-outline-warning me-md-2" type="button">Edit</button> */}

            {/* <button class="btn btn-outline-danger" type="button">Delete</button> */}

            <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Delete
            </button>
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Delete</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to delete this?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    }));
    const [record, setRecord] = useState(data);
    function handlefilter(event) {
        const newData = record.filter(rows => rows.title.toLowerCase().includes(event.target.toLowerCase()));
        setRecord(newData)
    }


    return (
        <Layout>
            <div className="container mt-5 bg-body-tertiary">
                <nav class="navbar ">
                    <div class="container-fluid justify-content-end">
                        <form class="d-flex" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handlefilter}></input>
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
                <h1> DataTable</h1>
                <DataTable
                    columns={columns}
                    data={rows}
                    pagination
                    fixedHeader
                />
            </div>
        </Layout>

    );
}

export default Datatable;
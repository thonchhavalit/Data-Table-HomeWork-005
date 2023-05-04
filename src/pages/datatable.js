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
            name:"Category",
            selector: "category",
            sortable: true,
        },
        {
            name: "Image",
            selector: "images",
            sortable: true,
        },
    ];

    const rows = data.map((item) => ({
        title: item.title,
        price: item.price,
        category:item.category.name,
        images: <img src={item.images} style={{ height: '10rem', width: '10rem' }}></img> ,
        
    }));
    const [record, setRecord] = useState(data);
    function handlefilter(event) {
        const newData = data.filter(rows =>{
            return rows.title.toLoweCase().includes(event.target.value.toLoweCase())
        })
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
                    columns={columns} data={rows}
                    pagination
                    fixedHeader
                />
            </div>
        </Layout>

    );
}

export default Datatable;
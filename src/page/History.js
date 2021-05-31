import React from "react"
import Navbar from "../component/Navbar"
import { base_url} from "../config.js";
import HistoryList from "../component/historyList"
import $ from "jquery"
import axios from "axios"

export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            pembayaran:[],
            token:"",
            action:"",
            id_pembayaran:"",
            id_petugas:"",
            nisn:"",
            tgl_bayar:"",
            bulan_bayar:"",
            tahun_bayar:"",
            id_spp: "",
            jumlah_bayar: ""
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
        this.headerConfig.bind(this)
    }
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }
    getTransaksi = () => {
        let url = base_url + "/transaksi"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({pembayaran: response.data})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }
    componentDidMount(){
        this.getTransaksi()
    }
    Add = () => {
        $("#modal_product").modal("show")
        this.setState({
            action: "insert",
            id_pembayaran:0,
            id_petugas:0,
            nisn:"",
            tgl_bayar:"",
            bulan_bayar:"",
            tahun_bayar:"",
            id_spp: 0,
            jumlah_bayar: 0
        })
    }
    Edit = selectedItem => {
        this.setState({
            action: "update",
            id_pembayaran: selectedItem.id_pembayaran,
            id_petugas: selectedItem.id_petugas,
            nisn: selectedItem.nisn,
            tgl_bayar:selectedItem.tgl_bayar,
            bulan_bayar:selectedItem.bulan_bayar,
            tahun_bayar:selectedItem.tahun_bayar,
            id_spp:selectedItem.id_spp,
            jumlah_bayar:selectedItem.jumlah_bayar
        })
        //console.log(this.state.id_kelas)
    }
    dropTransaksi = selectedItem => {
        if (window.confirm("are you sure will delete this data?")) {
            let url = base_url + "/transaksi/" + selectedItem.id_pembayaran
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getTransaksi()
            })
            .catch(error => console.log(error))
        }
    }
    render(){
        return(
            <div>
                <Navbar/>
                <div className="container">
                   <h3 className="text-bold text-info mt-2">History</h3>
                   <div className="row">
                       { this.state.pembayaran.map( item => (
                           <HistoryList
                           id_pembayaran = {item.id_pembayaran}
                           id_petugas = {item.id_petugas}
                           nisn = {item.nisn}
                           tgl_bayar = {item.tgl_bayar}
                           bulan_bayar = {item.bulan_bayar}
                           tahun_bayar = {item.tahun_bayar}
                           id_spp = {item.id_spp}
                           jumlah_bayar = {item.jumlah_bayar}
                           onEdit = {() => this.Edit(item)}
                           onDrop = {() => this.dropTransaksi(item)}
                            />
                       )) }
                    </div>
                </div>
            </div>
        )
    }
}
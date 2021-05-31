import React from "react"
  import { Switch, Route } from "react-router-dom";
  import Login from "./page/Login"
  import History from "./page/History"
  import Kelas from "./page/Kelas"
  import Transaksi from "./page/Transaksi"
  import Home from "./page/Home"
  import Siswa from "./page/Siswa"
  import Spp from "./page/Spp"
  import Petugas from "./page/Petugas"


  export default class App extends React.Component{
    render(){
      return(
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/history" component={History} />
          <Route path="/kelas" component={Kelas} />
          <Route path="/transaksi" component={Transaksi} />
          <Route path="/siswa" component={Siswa} />
          <Route path="/spp" component={Spp} />
          <Route path="/petugas" component={Petugas} />

        </Switch>
      )
    }
  }
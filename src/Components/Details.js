import React, { useEffect, useState } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import apiCalls from './apiCalls';
import {Container,Row,Col,Card,Image,Button,Form, Spinner} from 'react-bootstrap';


function Detail() {
  const [datatable, setDatatable] = useState({});
  const [isLoding, setIsLoading] = useState(true);


  const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1);

  useEffect(() =>{
    getDetails(getLastItem(window.location.href));
  }, []);

  const getDetails = (marketName) =>{
    apiCalls.GetCall(
      "https://api.buyucoin.com/ticker/v1.0/liveData?symbol="+marketName,
      response => {
        
        let data = response.data[0]
        setDatatable(
          data
        ) 
        setIsLoading(false);
      },
      err => {
        alert("something went wrong");
        console.log('error while getting details ---->' + err,);
      },
    );
  }

  const displayData = (key, value) =>{
    return(
            <Row>
            <Col>{key} </Col>
            <Col>{value}</Col>
            </Row>
    )
  }

  if(isLoding){
    return(
        <Spinner
            as="span"
            variant="light"
            size="lg"
            role="status"
            aria-hidden="true"
            animation="border"
        />
    )
  }


  return (
    <div style={{alignItems: "center", display: "flex", flexDirection: "column", margin: 10}}>
        <Row>
            <Col lg="2" style={{right: 200}}> <a href="/">Back</a></Col>
            <Col lg="10"> <h4 style={{textTransform:"capitalize"}}>Market : {datatable.marketName}</h4></Col>
        </Row>
         
        <Card style={{ width: '50rem' }}>
            {displayData('Bid', datatable.bid)}
            {displayData('Ask', datatable.ask)}
            {displayData('Sprd', datatable.sprd)}
            {displayData('tVolAsk', datatable.tVolAsk)}
            {displayData('tVolBid', datatable.tVolBid)}
            {displayData('l24', datatable.l24)}
            {displayData('v24', datatable.v24)}
            {displayData('tp24', datatable.tp24)}
            {displayData('LTRate', datatable.LTRate)}
            {displayData('LTVol', datatable.LTVol)}
            {displayData('LBRate', datatable.LBRate)}
            {displayData('LBVol', datatable.LBVol)}
            {displayData('LSRate', datatable.LSRate)}
            {displayData('LSVol', datatable.LSVol)}
            {displayData('c24', datatable.c24)}
            {displayData('c24p', datatable.c24p)}
            {displayData('Market Name', datatable.marketName)}
            {displayData('Curr To Name', datatable.currToName)}
            {displayData('Base Currency', datatable.baseCurrency)}
            {displayData('Quote Currency', datatable.quoteCurrency)}
            {displayData('Base Currency Id', datatable.baseCurrencyId)}
            {displayData('Quote Currency Id', datatable.quoteCurrencyId)}
            {displayData('Is Active', datatable.isActive.toString())}

        </Card>
    </div>
    
  );
}

export default Detail;
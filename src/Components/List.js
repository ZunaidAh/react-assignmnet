import React, { useEffect, useState } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import apiCalls from './apiCalls';
import { Spinner } from 'react-bootstrap';

function List() {
  const columns= [
    {
      label: 'Market Name',
      field: 'marketName',
      width: 270,
    },
    {
      label: 'CurrToName',
      field: 'currToName',
      width: 170,
    },
    {
      label: 'Base Currency',
      field: 'baseCurrency',
      width: 70,
    },
    {
      label: 'Base Currency Id',
      field: 'baseCurrencyId',
      width: 70,
    },
    {
      label: 'Quote Currency',
      field: 'quoteCurrency',
      width: 70,
    },
    {
      label: 'Quote Currency Id',
      field: 'quoteCurrencyId',
      width: 70,
    }
  ];
  const [datatable, setDatatable] = useState({
    columns,
    rows: []
  });
  const [isLoding, setIsLoading] = useState(true);

  useEffect(() =>{
    getDetails();
  }, []);

  const getDetails = () =>{
    apiCalls.GetCall(
      "https://api.buyucoin.com/ticker/v1.0/liveData",
      response => {
        //console.log(response);
        let data = {
          columns : columns,
          rows: getRows(response.data)
        }
        setDatatable(data);
        setIsLoading(false);
      },
      err => {
        //setIsLoading(false);
        alert("something went wrong");
        console.log('error while getting details ---->' + err,);
      },
    );
  }

  const clickOnRow = (value) =>{
    //console.log(value);
    window.location.href = "/detail/"+value.marketName;
  }
  const getRows = (data) =>{
    data.forEach(object => {
      object.clickEvent = clickOnRow ;
    });
    return data;
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

  return <MDBDataTableV5 hover entriesOptions={[5, 10, 15]} entries={10} pagesAmount={4} data={datatable} searchTop searchBottom={false} />;
}

export default List;
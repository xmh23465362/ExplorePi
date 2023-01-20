'use client'
import getago from "lib/time";
import { useEffect, useState } from "react";
import { Server } from "stellar-sdk";
import TableLoading from "./tableloading";

export default function Block({transcript,time}){
    const server = new Server(process.env['NEXT_PUBLIC_HORIZON_SERVER'])
    const [block10,setblock10] = useState(null)
    useEffect(()=>{
        server.ledgers()
        .cursor('now')
        .order('desc')
        .call().then( res => {
            setblock10(res.records)
            console.log(res)
        })
    },[])
    return(
        <>
        <table className='table-fixed w-full text-center font-mono'>
            <thead className="border-b border-slate-400 text-lg">
                <tr>
                    <th>{transcript.Block}</th>
                    <th>{transcript.Transactions}</th>
                    <th>{transcript.Time}</th>
                </tr>
            </thead>
            <tbody>
                {block10===null ?  <TableLoading/>:block10.map((data,index)=>{
                    let date = new Date(data.closed_at)
                    return(
                        <tr key={index} className='border-b border-slate-300 text-lg'>
                            <td>{data.sequence}</td>
                            <td>{data.successful_transaction_count}</td>
                            <td>{getago(data.closed_at,time)}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </>
    )
}
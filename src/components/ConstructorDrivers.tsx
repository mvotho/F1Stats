import { LinkIcon } from '@heroicons/react/24/solid';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { Link } from 'react-router-dom';
import { fetchConstructorsDrivers } from '../api';

const ConstructorDrivers = (c: any) => {


    const selectedConstructor = c.c;
    const { data, error, isLoading }: any = useQuery(["currentConstructorsDrivers", selectedConstructor], () => fetchConstructorsDrivers(selectedConstructor));

    if (error) return <div>Request Failed</div>;
    if (isLoading) return <div>Loading...</div>;

    console.log(data)
    const constructorDriver = data.MRData.DriverTable.Drivers.map((data: any) => {
        const driver = data.familyName;
        return (
            <tr>
                <th>{data.givenName}</th>
                <th>{data.familyName}</th>
                <th>{data.url}</th>
                <th><Link to={"/Drivers/"+ driver}><LinkIcon width={20} height={20}></LinkIcon></Link></th>
            </tr>
        )
    })
    return (
    <div className='flex flex-row justify-center gap-20 pt-6'>
            <table className='table-primary [&_th]:table-primary [&_th]:p-2 text-sm'>
                <thead className='table-primary bg-slate-200' >
                    <tr>
                        <th>Name</th>
                        <th>Surename</th>
                        <th>URL</th>
                        <th>Link</th>
                    </tr>
                </thead>
                {constructorDriver}
            </table>
        </div>
    )
}

export default ConstructorDrivers
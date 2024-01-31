
import { Table } from 'antd';
import {useCrypto} from "../context/crypto-context";

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend'],
    },
    {
        title: 'Price, $',
        dataIndex: 'price',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.age - b.age,
    },
    {
        title: 'Amount',
        dataIndex: 'Amount',
        filters: [
            {
                text: 'London',
                value: 'London',
            },
            {
                text: 'New York',
                value: 'New York',
            },
        ],
        onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
];


export default function AssetsTable(){
    const {assets,crypto} = useCrypto()

    const data = assets.map((a) => ({
            key: a.id,
            name:a.name,
            price:a.price,
            amount:a.amount,
        }))
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    return(
        <div>
            <Table pagination={false} columns={columns} dataSource={data} onChange={onChange} />
        </div>
    )
}
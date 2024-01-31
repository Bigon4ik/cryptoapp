import {Button, Layout, Select, Space,Drawer} from "antd";
import {useCrypto} from "../../context/crypto-context";
import {useEffect, useState} from "react";
import Modal from "antd/es/modal/Modal";
import AddAssetForm from "../AddAssetForm";
import CoinInfoModal from "../CoinInfoModal";

const headerStyle = {
    width:"100%",
    textAlign: 'center',
    height: 60,
    padding:'1rem',
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
};

export default function AppHeader(){
    const {crypto} = useCrypto()

    const [select,setSelect] = useState(false)
    const [modal,setModal] = useState(false)
    const [coin,setCoin] = useState(null)
    const [drawer,setDrawer] = useState(false)


    useEffect(()=>{
        const keypress = event =>{
            if(event.key ==='/'){
                setSelect((prev)=>!prev)
            }
        }
        document.addEventListener('keypress',keypress)
        return () => document.removeEventListener('keypress',keypress)

    },[])

    function handlerSelect(value){
        setCoin(crypto.find(c => c.id === value))
        setModal(true)
    }
    return(
        <Layout.Header style={headerStyle}>
            <Select
                    style={{ width:250 }}
                    value={'press/ to open'}
                    options={crypto.map(coin=>(
                        {label:coin.name,
                            value:coin.id,
                            icon:coin.icon,}))}
                    open={select}
                    onClick={()=>setSelect((prev)=>!prev)}
                    onSelect={handlerSelect}
                    optionRender={(option) => (
                        <Space>
                            <img style={{width:20}} src={option.data.icon}
                                 alt={option.data.label}/>
                                 {option.data.label}
                        </Space>
                    )}
            />
            <Button onClick={() => setDrawer(true)} type="primary">Add Asset</Button>
            <Modal open={modal} footer={null} onCancel={()=>setModal(false)}>
                <CoinInfoModal coin={coin}/>
            </Modal>
            <Drawer width={600} title={'Add Asset'} destroyOnClose onClose={() => setDrawer(false)} open={drawer}>
                <AddAssetForm onClose={()=>setDrawer(false)}/>

            </Drawer>
        </Layout.Header>

    )
}
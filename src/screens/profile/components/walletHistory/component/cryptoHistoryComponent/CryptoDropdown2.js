import React, { useState } from 'react'
import { Text, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';

export default function CryptoDropdown2() {

    const [value02, setValue02] = useState(null);
    const [open02, setOpen02] = useState(false);
    const [items3, setItems3] = useState([
        { label: 'All', value: 'All' },
        { label: 'USDT', value: 'USDT' },
        { label: 'INR', value: 'INR' },
        { label: 'TRX', value: 'TRX' },
        { label: 'BTC', value: 'BTC' },
        { label: 'BNB', value: 'INR' },
    ]);

    return (
        <View style={{ width: '45%' }}>
            <DropDownPicker
                style={{
                    borderRadius: 0,
                    height: 37
                }}
                zIndex={999}
                zIndexInverse={9000}
                open={open02}
                value={value02}
                items={items3}
                setOpen={setOpen02}
                setValue={setValue02}
                setItems={setItems3}
                placeholder="All"
            />
        </View>
    )
}


// ArrowDownIconComponent={({style}) => <Icon name="chevron-down-outline" size={25} color={'#000'}/> }
// ArrowUpIconComponent={({style}) => <Icon name="chevron-up-outline" size={25} color={'#000'}/> }
// dropDownContainerStyle={{backgroundColor: '#FFF', color: '#000'}}
// style={{backgroundColor: '#FFF', borderColor: '#CCC', width: '100%'}}
// listItemLabelStyle={{color: '#000'}}
// listItemContainerStyle={{color: '#000'}}
// labelStyle={{color: '#000'}}
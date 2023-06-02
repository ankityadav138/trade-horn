import React, { useState } from 'react'
import { Text, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';

export default function CryptoDropdown3() {

    const [value03, setValue03] = useState(null);
    const [open03, setOpen03] = useState(false);
    const [items3, setItems3] = useState([
        { label: 'All', value: 'All' },
        { label: 'USDT', value: 'USDT' },
        { label: 'INR', value: 'INR' },
        { label: 'TRX', value: 'TRX' },
        { label: 'BTC', value: 'BTC' },
        { label: 'BNB', value: 'INR' },
    ]);

    return (
        <View style={{ width: '47%' }}>
            <DropDownPicker
                style={{
                    borderRadius: 0,
                    height: 37
                }}
                zIndex={1000}
                zIndexInverse={1000}
                open={open03}
                value={value03}
                items={items3}
                setOpen={setOpen03}
                setValue={setValue03}
                setItems={setItems3}
                placeholder="All"
            />
        </View>
    )
}

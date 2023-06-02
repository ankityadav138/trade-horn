import React, { useState } from 'react'
import { Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';


export default function FiatDropdown1() {



    const [open01, setOpen01] = useState(false);
    const [value01, setValue01] = useState(null);
    const [items2, setItems2] = useState([
        { label: 'All', value: 'All' },
        { label: 'Deposit', value: 'Deposite' },
        { label: 'Withdraw', value: 'Withdrawe' },
    ]);

    return (
        <View style={{ width: '47%' }}>
            <DropDownPicker
                style={{
                    borderRadius: 0,
                    height: 37
                }}
                onSelectItem={ }
                zIndex={1000}
                zIndexInverse={1000}
                open={open01}
                value={value01}
                items={items2}
                setOpen={setOpen01}
                setValue={setValue01}
                setItems={setItems2}
                placeholder="All"
            />
        </View>
    )
}

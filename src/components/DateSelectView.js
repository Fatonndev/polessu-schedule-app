import { Text, View } from "react-native";
import React from 'react'

import DateSelect from "./DateSelect";

const monthNames = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
];

export default function DateSelectView({ week, setWeek, setDay, semStart, semLength }) {

    return <View>
        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 14, marginBottom: 24, color: '#B8B8B8' }}>
            { week.from?.getDate() } { monthNames[week.from?.getMonth()] } - { week.to?.getDate() } { monthNames[week.to?.getMonth()] } { week.isCurrent ? '(текущая)' : '' } {'>'}
        </Text>

        <DateSelect weekCount={semLength} defaultSelected={Math.floor(new Date().getTime() / (1000 * 60 * 60 * 24) - semStart.getTime() / (1000 * 60 * 60 * 24))} from={semStart} onChange={setWeek} onChangeDay={setDay} />
    </View>
}




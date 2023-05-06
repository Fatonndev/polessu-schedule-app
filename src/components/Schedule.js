import { Text, View } from "react-native";
import { declination } from "../utils/formatting";

import RunSvg from "../../assets/svg/run.svg";
import CoffeeSvg from "../../assets/svg/coffee.svg";
import SleepSvg from "../../assets/svg/sleep.svg";

export default function Schedule({ data, styles, getViewFromAllGroup, getViewFromGroup }) {
    return <View style={{ ...styles.container, marginBottom: 45 }}>
        {
            data.map((block, index) => {
                if (block.duration) {
                    const hours = Math.floor(block.duration / 60);
                    const minutes = block.duration % 60;

                    let out_time = "";

                    if (hours) {
                        out_time += hours + ' час' + declination(hours, ['', 'а', 'ов']) + ' ';
                    }
                    if (minutes) {
                        out_time += minutes + ' минут' + declination(minutes, ['а', 'ы', ''])
                    }

                    return <View style={{ marginTop: 13, marginBottom: 13, height: 40, flexDirection: 'row' }} key={index}>
                        <View style={{ backgroundColor: '#545454', width: 1.5, marginLeft: 27.5  }} />

                        {
                            block.duration <= 30
                                ? <RunSvg height={40} width={30} style={{ marginLeft: 34,color: '#656565' }} />
                                : block.duration < 60
                                    ? <CoffeeSvg height={40} width={30} style={{ marginLeft: 34,color: '#656565' }} />
                                    : <SleepSvg height={40} width={30} style={{ marginLeft: 34, color: '#656565' }} />
                        }

                        <Text style={{ color: '#737373', fontFamily: 'Inter-Regular', textAlignVertical: 'center', marginLeft: 4 }}>
                            Перерыв { out_time }
                        </Text>
                    </View>
                }

                return <View style={{ backgroundColor: '#aa000000', flexDirection: 'row' }} key={index}>

                    <View style={{ minHeight: 80, backgroundColor: block.color, ...styles.containerBar }}>
                        <Text style={styles.containerBarText}> { block.from } </Text>
                        <View style={{ backgroundColor: '#fff', width: 1, flexGrow: 1, marginLeft: '48%'  }} />
                        <Text style={styles.containerBarText}> { block.to } </Text>
                    </View>

                    <View style={{ flexGrow: 1 }}>
                        {
                            (() => {
                                const out = [];

                                if (block.groups.length === 1 && !block.groups[0].name) {
                                    out.push(getViewFromAllGroup(block.groups[0]));
                                } else {
                                    for (let i = 0; i < block.groups.length - 1; i++) {
                                        out.push(getViewFromGroup(block.groups[i]));
                                        out.push(<View style={{ height: 1, backgroundColor: '#0D0D0D', marginTop: 10, marginBottom: 10, marginLeft: 15 }} />)
                                    }

                                    out.push(getViewFromGroup(block.groups[block.groups.length - 1]));
                                }

                                return out;
                            })()
                        }
                    </View>
                </View>
            })
        }
    </View>
}




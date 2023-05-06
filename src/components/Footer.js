import { Text, View } from "react-native";

import AlarmSvg from "../../assets/svg/alarm.svg";
import GeoSvg from "../../assets/svg/geo.svg";
import LearnSvg from "../../assets/svg/learn.svg";
import SportSvg from "../../assets/svg/sport.svg";
import GearSvg from "../../assets/svg/gear.svg";

export default function Footer(props) {
    return <View style={{ backgroundColor: 'rgb(5,5,5)', height: 55, flexDirection: 'column' }}>
        <View style={{ backgroundColor: '#1f1f1f', height: 1 }} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 5, marginRight: 5, paddingTop: 5 }}>
            <View style={{ width: 75, alignItems: 'center' }}>
                <AlarmSvg height={26} width={23} style={{ color: '#575757', marginTop: 2 }} />
                <Text style={{ color: '#575757', fontSize: 10 }}>
                    Будильники { props.test }
                </Text>
            </View>

            <View style={{ width: 75, alignItems: 'center' }}>
                <GeoSvg height={26} width={23} style={{ color: '#575757', marginTop: 2 }} />
                <Text style={{ color: '#575757', fontSize: 10 }}>
                    Навигатор
                </Text>
            </View>

            <View style={{ width: 75, alignItems: 'center'  }}>
                <LearnSvg height={26} width={25} style={{ color: '#6663FF', marginTop: 2 }} />
                <Text style={{ color: '#6663FF', fontSize: 10 }}>
                    Расписание
                </Text>
            </View>

            <View style={{ width: 75, alignItems: 'center' }}>
                <SportSvg height={26} width={22} style={{ color: '#575757', marginTop: 2 }} />
                <Text style={{ color: '#575757', fontSize: 10 }}>
                    Спортобьекты
                </Text>
            </View>

            <View style={{ width: 75, alignItems: 'center' }}>
                <GearSvg height={26} width={23} style={{ color: '#575757', marginTop: 2 }} />
                <Text style={{ color: '#575757', fontSize: 10 }}>
                    Настройки
                </Text>
            </View>
        </View>
    </View>
}

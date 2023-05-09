import ArrowDownSvg from './assets/svg/arrow-down.svg'

import React, { useRef } from 'react';

import { StatusBar } from 'expo-status-bar';
import { RefreshControl, StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { useFonts } from 'expo-font';

import Footer from "./src/components/Footer";
import Schedule from "./src/components/Schedule";
import DateSelectView from "./src/components/DateSelectView";

import * as parser from "./src/utils/parser";
import {getCurrentWeek} from "./src/utils/time";

const sm_start = new Date(2023, 1, 6);
const sm_length = 19;
const schedule = new parser.Schedule('22ИТ-2');

const already = Math.floor( new Date().getTime() / (1000 * 60 * 60 * 24) - sm_start.getTime() / (1000 * 60 * 60 * 24) );

let first = true;
let day = already;

export default function App() {
  const [refreshing, setRefreshing] = React.useState(true);

  const [data, setData] = React.useState([]);

  const curWeek = getCurrentWeek();

  const [week, setWeek] = React.useState({
    from: curWeek.start,
    to: curWeek.end,
    isCurrent: true
  });

  const setDayZ = async (v) => {
    day = v;
    await updateData(false);
  }

  const updateData = async (update) => {
    if (update) {
      await schedule.updateData();
    }

    const updated = schedule.toReactFormat(Math.floor(day / 7), day % 7);

    setData(updated);

    //console.warn(schedule.last_polessu_update)
  }

  if (first) {
    (async () => {
      try {
        await updateData(true)
      } catch (e) {
        setData([ ]);
        console.error(e);
      }

      setRefreshing(false);
    })()

    first = false;
  }

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

    try {
      await updateData(true)
    } catch (e) {
      console.error(e);
      setData([ ]);
    }

    setRefreshing(false);
  }, []);

  const [fontsLoaded] = useFonts({
    'Inter-Bold': require('./assets/fonts/inter_bold.ttf'),
    'Inter-Regular': require('./assets/fonts/inter_regular.ttf'),
    //'Inter-SemiBold': require('./assets/fonts/inter_semi_bold.ttf'),
    'Inter-Medium': require('./assets/fonts/inter_medium.ttf'),
  });

  if (!fontsLoaded) {
    return (
        <View style={styles.screen}>
          <StatusBar style="dark" />
        </View>
    );
  }

  const getViewFromGroup = (group) => {
    return <View style={{ flexDirection: 'row'}}>
      <View>
        <View style={styles.subGroupLimiter} />
      </View>

      <View style={{ flexGrow: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
          <View style={styles.subGroupBar}>
            <Text style={styles.subGroupTitle}>{ group.name }</Text>
          </View>
          <Text style={styles.arrowRight}>{'>'}</Text>
        </View>

        <View style={{ marginLeft: 9, marginTop: 4 }}>
          <Text style={styles.name}>{ group.subject }</Text>
          <Text style={styles.teacherName}>{ group.teacher }</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <View style={styles.arg}>
              {
                group.auditorium ? <Text style={styles.argText}> { group.auditorium } </Text> : undefined
              }
            </View>
            <View style={styles.arg}>
              <Text style={styles.argText}> { group.type } </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  }
  const getViewFromAllGroup = (group) => {
    return <View style={{ marginLeft: 12, marginTop: 0, flexGrow: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
        <Text style={styles.name}>{ group.subject }</Text>
        <Text style={styles.arrowRight}>{'>'}</Text>
      </View>

      <Text style={styles.teacherName}>{ group.teacher }</Text>

      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginLeft: 4 }}>
          <View style={styles.arg}>
            {
              group.auditorium ? <Text style={styles.argText}> { group.auditorium } </Text> : undefined
            }
          </View>
          <View style={styles.arg}>
            <Text style={styles.argText}> { group.type } </Text>
          </View>
        </View>
      </View>

    </View>
  }

  console.log("App render")

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" />

      <ScrollView style={styles.screen}
        ref={(ref)=>this.scroll = ref}
        refreshControl={
          <RefreshControl refreshing={refreshing} progressViewOffset={30} onRefresh={onRefresh} />
        }
        onScroll={event => {
          const yCur = event.nativeEvent.layoutMeasurement.height + event.nativeEvent.contentOffset.y;

          this.arrow.setNativeProps({
            style:{
              opacity: Math.min((event.nativeEvent.contentSize.height - yCur) / 100, 1)
            }
          })
        }}>
        <Text style={{ fontFamily: 'Inter-Bold', fontSize: 29, marginTop: 30, marginBottom: 1, color: '#fff' }}>
          Расписание 22ИТ-2
        </Text>

        <DateSelectView week={week} setWeek={setWeek} setDay={setDayZ} semStart={sm_start} semLength={sm_length} />

        <Schedule styles={styles} data={data} getViewFromAllGroup={getViewFromAllGroup} getViewFromGroup={getViewFromGroup} />
      </ScrollView>

      <Footer />

      <Pressable ref={(ref) => this.arrow = ref} onPress={()=>{ this.scroll.scrollToEnd({ animated: true }) }} style={{ position: 'absolute', bottom: 70, right: 22, backgroundColor: '#171717', padding: 12, borderRadius: 30, elevation: 1 }}>
        <ArrowDownSvg width={16} height={16} style={{ color: '#E9E9E9' }} />
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 22,
    height: '100%',
    backgroundColor: '#000'
  },

  // Стрелка справа
  arrowRight: {
    color: '#6663FF',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    marginRight: 2
  },

  // Преподаватель
  teacherName: {
    color: '#7D7D7D',
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginLeft: 1
  },
  // Название предмета
  name: {
    color: '#fff',
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    textIndent: 0,
    marginLeft: 0,
    paddingLeft: 0,
    backgroundColor: '#000'
  },

  // Контейнер аргумента
  arg: {
    backgroundColor: '#151515',
    borderRadius: 4
  },
  // Текст аргументов (кабинет)
  argText: {
    color: '#7F7CE2',
    fontFamily: 'Inter-Regular',
    marginLeft: 7,
    marginRight: 7,
    marginTop: 2,
    marginBottom: 2
  },

  // Название подгруппы
  subGroupTitle: {
    color: '#8482DD',
    padding: 3,
    paddingRight: 8,
    paddingLeft: 4,
    fontFamily: 'Inter-Regular',
  },
  // Фон названия группы
  subGroupBar: {
    backgroundColor: '#191919',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    alignSelf: 'flex-start'
  },
  // Разграничитель палка подгрупп
  subGroupLimiter: {
    backgroundColor: '#191919',
    width: 3,
    flexGrow: 1,
    marginLeft: 17,
    borderTopLeftRadius: 4
  },

  // Текст (время) в колонке
  containerBarText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
    fontFamily: 'Inter-Medium',
    marginBottom: 5
  },
  // Колонка времени
  containerBar: {
    width: 57,
    borderRadius: 6,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },


});

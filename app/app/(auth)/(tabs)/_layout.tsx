import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import { Tabs } from 'expo-router'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#4d1d92',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({
            color,
            focused,
          }: {
            color: string
            focused: boolean
          }) => (
            <TabBarIcon
              name={focused ? 'home' : 'home-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="sets"
        options={{
          title: 'Sets',
          tabBarIcon: ({
            color,
            focused,
          }: {
            color: string
            focused: boolean
          }) => (
            <TabBarIcon
              name={focused ? 'book-multiple' : 'book-multiple-outline'}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  )
}

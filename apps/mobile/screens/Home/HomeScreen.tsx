import { LinearGradient } from 'expo-linear-gradient';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { spacing } from '@scrapdealer/tokens';

import { useThemeContext } from '../../theme/ThemeProvider';

const { width } = Dimensions.get('window')

export const HomeScreen = () => {
  const insets = useSafeAreaInsets()
  const { theme, mode } = useThemeContext()
  const { myColors } = theme

  const quickActions = [
    { id: 1, title: 'خرید ضایعات', icon: '🛒', color: '#4CAF50' },
    { id: 2, title: 'فروش ضایعات', icon: '💰', color: '#FF9800' },
    { id: 3, title: 'قیمت‌گذاری', icon: '📊', color: '#2196F3' },
    { id: 4, title: 'پشتیبانی', icon: '💬', color: '#9C27B0' }
  ]

  return (
    <View style={[styles.container, { backgroundColor: myColors.white }]}>
      <LinearGradient
        colors={mode === 'dark' ? ['#00c853', '#004d40'] : ['#00e676', '#00c853']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: insets.top + spacing.lg }]}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>سلام 👋</Text>
            <Text style={styles.headerTitle}>به ضایعات‌چی خوش آمدید</Text>
          </View>

          <TouchableOpacity style={styles.notificationButton}>
            <Text style={styles.notificationIcon}>🔔</Text>
            <View style={styles.badge} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.xl }}
      >
        <View style={[styles.statsCard, { backgroundColor: myColors.white }]}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: myColors.textPrimary }]}>۱۲</Text>
            <Text style={[styles.statLabel, { color: myColors.textSecondary }]}>معاملات فعال</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#FF9800' }]}>۸۵</Text>
            <Text style={[styles.statLabel, { color: myColors.textSecondary }]}>کل معاملات</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#2196F3' }]}>٪۹۸</Text>
            <Text style={[styles.statLabel, { color: myColors.textSecondary }]}>رضایت کاربران</Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: myColors.textPrimary }]}>دسترسی سریع</Text>

        <View style={styles.quickActionsGrid}>
          {quickActions.map(action => (
            <TouchableOpacity
              key={action.id}
              style={[styles.actionCard, { backgroundColor: myColors.white }]}
              activeOpacity={0.7}
            >
              <View style={[styles.actionIconContainer, { backgroundColor: `${action.color}15` }]}>
                <Text style={styles.actionIcon}>{action.icon}</Text>
              </View>

              <Text style={[styles.actionTitle, { color: myColors.textPrimary }]}>
                {action.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: myColors.textPrimary }]}>
          فعالیت‌های اخیر
        </Text>

        {[1, 2, 3].map(item => (
          <View
            key={item}
            style={[styles.activityCard, { backgroundColor: myColors.white }]}
          >
            <View style={styles.activityIconContainer}>
              <Text style={styles.activityIcon}>📦</Text>
            </View>

            <View style={styles.activityContent}>
              <Text style={[styles.activityTitle, { color: myColors.textPrimary }]}>
                خرید ضایعات پلاستیک
              </Text>
              <Text style={[styles.activityDate, { color: myColors.textSecondary }]}>
                ۲ ساعت پیش
              </Text>
            </View>

            <View>
              <Text style={[styles.priceAmount, { color: myColors.textPrimary }]}>
                ۲۵۰,۰۰۰ تومان
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  greeting: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Vazirmatn'
  },
  headerTitle: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'Vazirmatn-Bold'
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  notificationIcon: { fontSize: 24 },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF5252',
    borderWidth: 1.5,
    borderColor: '#fff'
  },
  content: { flex: 1, marginTop: -spacing.xl },
  statsCard: {
    flexDirection: 'row',
    marginHorizontal: spacing.xl,
    marginBottom: spacing.xl,
    padding: spacing.lg,
    borderRadius: 18
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: {
    fontSize: 26,
    fontFamily: 'Vazirmatn-Bold'
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Vazirmatn'
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginHorizontal: spacing.md
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Vazirmatn-Bold',
    marginHorizontal: spacing.xl,
    marginTop: spacing.lg,
    marginBottom: spacing.sm
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md
  },
  actionCard: {
    width: (width - spacing.xl * 3) / 2,
    padding: spacing.lg,
    borderRadius: 14,
    marginBottom: spacing.md,
    marginRight: spacing.md
  },
  actionIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm
  },
  actionIcon: { fontSize: 26 },
  actionTitle: {
    fontSize: 14,
    fontFamily: 'Vazirmatn'
  },
  activityCard: {
    flexDirection: 'row',
    marginHorizontal: spacing.xl,
    marginBottom: spacing.md,
    padding: spacing.md,
    borderRadius: 16,
    alignItems: 'center'
  },
  activityIconContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(0,230,118,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md
  },
  activityIcon: { fontSize: 22 },
  activityContent: { flex: 1 },
  activityTitle: {
    fontSize: 15,
    fontFamily: 'Vazirmatn-Bold'
  },
  activityDate: {
    fontSize: 12,
    fontFamily: 'Vazirmatn'
  },
  priceAmount: {
    fontSize: 15,
    fontFamily: 'Vazirmatn-Bold'
  }
})

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Activity, Shield, Users } from 'lucide-react';

export default function About() {
  return (
    <div className='space-y-6 p-4 sm:p-6'>
      <div>
        <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white'>
          About Health Dashboard
        </h1>
        <p className='text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1 sm:mt-2'>
          Empowering you to take control of your health and wellness journey
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Why Health Matters */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Heart className='w-5 h-5 text-red-500' />
              Why Health Matters
            </CardTitle>
            <CardDescription>
              Understanding the importance of monitoring your health metrics
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <p className='text-gray-700 dark:text-gray-300'>
              Your health is your most valuable asset. Regular monitoring of key health metrics 
              helps you understand your body better and make informed decisions about your lifestyle.
            </p>
            <p className='text-gray-700 dark:text-gray-300'>
              By tracking sleep patterns, heart rate, and daily activity, you can identify trends, 
              set realistic goals, and work towards a healthier, more balanced life.
            </p>
            <div className='bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg'>
              <p className='text-blue-800 dark:text-blue-200 text-sm font-medium'>
                "Prevention is better than cure. Monitoring your health today can prevent 
                serious health issues tomorrow."
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Our Mission */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Shield className='w-5 h-5 text-green-500' />
              Our Mission
            </CardTitle>
            <CardDescription>
              Making health monitoring accessible and actionable
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <p className='text-gray-700 dark:text-gray-300'>
              We believe that everyone deserves access to clear, actionable health insights. 
              Our dashboard provides you with the tools you need to understand your health data 
              and make positive changes.
            </p>
            <p className='text-gray-700 dark:text-gray-300'>
              Through intuitive visualizations and personalized recommendations, we help you 
              transform raw health data into meaningful insights that drive better health outcomes.
            </p>
          </CardContent>
        </Card>

        {/* Key Features */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Activity className='w-5 h-5 text-purple-500' />
              Key Features
            </CardTitle>
            <CardDescription>
              Comprehensive health tracking and analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              <div className='flex items-start gap-3'>
                <div className='w-2 h-2 bg-blue-500 rounded-full mt-2'></div>
                <div>
                  <h4 className='font-medium text-gray-900 dark:text-white'>Sleep Analysis</h4>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    Track sleep duration, quality, and cycle distribution
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <div className='w-2 h-2 bg-green-500 rounded-full mt-2'></div>
                <div>
                  <h4 className='font-medium text-gray-900 dark:text-white'>Heart Rate Monitoring</h4>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    Monitor heart rate trends throughout the day
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <div className='w-2 h-2 bg-purple-500 rounded-full mt-2'></div>
                <div>
                  <h4 className='font-medium text-gray-900 dark:text-white'>Activity Tracking</h4>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    Keep track of daily steps and physical activity
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Health Tips */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Users className='w-5 h-5 text-orange-500' />
              Health Tips
            </CardTitle>
            <CardDescription>
              Simple steps to improve your overall wellness
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='border-l-4 border-green-500 pl-4'>
                <h4 className='font-medium text-gray-900 dark:text-white'>Sleep Well</h4>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  Aim for 7-9 hours of quality sleep each night for optimal health and recovery.
                </p>
              </div>
              <div className='border-l-4 border-blue-500 pl-4'>
                <h4 className='font-medium text-gray-900 dark:text-white'>Stay Active</h4>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  Take at least 10,000 steps daily to maintain cardiovascular health.
                </p>
              </div>
              <div className='border-l-4 border-purple-500 pl-4'>
                <h4 className='font-medium text-gray-900 dark:text-white'>Monitor Trends</h4>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  Regular monitoring helps identify patterns and make informed health decisions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <Card className='mt-8'>
        <CardContent className='pt-6'>
          <div className='text-center space-y-2'>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              © 2024 Microhumanity. All rights reserved.
            </p>
            <p className='text-xs text-gray-500 dark:text-gray-500'>
              Empowering health through technology and data-driven insights.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
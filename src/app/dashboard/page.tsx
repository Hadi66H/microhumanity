'use client';

import dynamic from 'next/dynamic';

const ReactECharts = dynamic(() => import('echarts-for-react'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-64">Loading chart...</div>
});

export default function Dashboard() {
  // Sleep Hours Data (Last 7 days)
  const sleepHoursData = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value',
      name: 'Hours'
    },
    series: [{
      data: [7.5, 8.2, 6.8, 7.9, 8.1, 9.2, 8.5],
      type: 'bar',
      itemStyle: {
        color: '#3B82F6'
      }
    }],
    title: {
      text: 'Sleep Hours (Last 7 Days)',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    }
  };

  // Sleep Cycle Distribution (Pie Chart)
  const sleepCycleData = {
    series: [{
      type: 'pie',
      radius: '50%',
      data: [
        { value: 35, name: 'Deep Sleep' },
        { value: 45, name: 'Light Sleep' },
        { value: 20, name: 'REM Sleep' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }],
    title: {
      text: 'Sleep Cycle Distribution',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    }
  };

  // Heart Rate Trend (Line Chart)
  const heartRateData = {
    xAxis: {
      type: 'category',
      data: ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM', '12 AM']
    },
    yAxis: {
      type: 'value',
      name: 'BPM'
    },
    series: [{
      data: [65, 72, 78, 85, 88, 75, 68],
      type: 'line',
      smooth: true,
      itemStyle: {
        color: '#10B981'
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: 'rgba(16, 185, 129, 0.3)'
          }, {
            offset: 1, color: 'rgba(16, 185, 129, 0.1)'
          }]
        }
      }
    }],
    title: {
      text: 'Heart Rate Trend (Today)',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    }
  };

  // Steps Count (Bar Chart)
  const stepsData = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value',
      name: 'Steps'
    },
    series: [{
      data: [8500, 9200, 7800, 10500, 8800, 12000, 9500],
      type: 'bar',
      itemStyle: {
        color: '#8B5CF6'
      }
    }],
    title: {
      text: 'Daily Steps Count',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    }
  };

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
          Dashboard
        </h1>
        <p className='text-gray-600 dark:text-gray-400 mt-2'>
          Track your health metrics and sleep patterns
        </p>
      </div>

      {/* Charts Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Sleep Hours Bar Chart */}
        <div className='bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700'>
          <ReactECharts 
            option={sleepHoursData} 
            style={{ height: '300px' }}
          />
        </div>

        {/* Sleep Cycle Pie Chart */}
        <div className='bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700'>
          <ReactECharts 
            option={sleepCycleData} 
            style={{ height: '300px' }}
          />
        </div>

        {/* Heart Rate Line Chart */}
        <div className='bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700'>
          <ReactECharts 
            option={heartRateData} 
            style={{ height: '300px' }}
          />
        </div>

        {/* Steps Bar Chart */}
        <div className='bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700'>
          <ReactECharts 
            option={stepsData} 
            style={{ height: '300px' }}
          />
        </div>
      </div>

      {/* Health Summary Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700'>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
            Average Sleep
          </h3>
          <p className='text-3xl font-bold text-blue-600 dark:text-blue-400'>
            8.1h
          </p>
          <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
            Last 7 days
          </p>
        </div>

        <div className='bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700'>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
            Daily Steps
          </h3>
          <p className='text-3xl font-bold text-green-600 dark:text-green-400'>
            9,500
          </p>
          <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
            Today&apos;s average
          </p>
        </div>

        <div className='bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700'>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
            Heart Rate
          </h3>
          <p className='text-3xl font-bold text-red-600 dark:text-red-400'>
            75 BPM
          </p>
          <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
            Resting average
          </p>
        </div>
      </div>
    </div>
  );
}

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
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLabel: {
        fontSize: 10
      }
    },
    yAxis: {
      type: 'value',
      name: 'Hours',
      axisLabel: {
        fontSize: 10
      },
      min: 6,
      max: 10
    },
    series: [{
      data: [7.5, 8.2, 6.8, 7.9, 8.1, 9.2, 8.5],
      type: 'bar',
      itemStyle: {
        color: '#3B82F6'
      },
      label: {
        show: true,
        position: 'top',
        formatter: '{c}h',
        fontSize: 10
      }
    }],
    tooltip: {
      trigger: 'axis',
      formatter: function(params: any) {
        return params[0].name + '<br/>Sleep: ' + params[0].value + ' hours';
      }
    },
    grid: {
      left: '10%',
      right: '10%',
      top: '20%',
      bottom: '10%'
    }
  };

  // Sleep Cycle Distribution (Pie Chart - optimized for mobile)
  const sleepCycleData = {
    series: [{
      type: 'pie',
      data: [
        { value: 35, name: 'Deep Sleep', itemStyle: { color: '#8B5CF6' } },
        { value: 45, name: 'Light Sleep', itemStyle: { color: '#10B981' } },
        { value: 20, name: 'REM Sleep', itemStyle: { color: '#F59E0B' } }
      ],
      label: {
        show: true,
        position: 'inside',
        formatter: '{b}\n{c}%',
        fontSize: 10,
        fontWeight: 'bold'
      },
      labelLine: {
        show: true,
        length: 10,
        length2: 5
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.3)'
        },
        label: {
          show: true,
          fontSize: 12,
          fontWeight: 'bold'
        }
      }
    }],
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}% ({d}%)',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: 'transparent',
      textStyle: {
        color: '#fff',
        fontSize: 12
      }
    },
    legend: {
      show: true,
      position: 'bottom',
    }
  };

  // Heart Rate Trend (Line Chart - optimized for mobile)
  const heartRateData = {
    xAxis: {
      type: 'category',
      data: ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM', '12 AM'],
      axisLabel: {
        fontSize: 10,
        rotate: 45
      }
    },
    yAxis: {
      type: 'value',
      name: 'BPM',
      axisLabel: {
        fontSize: 10
      },
      min: 60,
      max: 90
    },
    series: [{
      data: [65, 72, 78, 85, 88, 75, 68],
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: {
        width: 3
      },
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
    tooltip: {
      trigger: 'axis',
      formatter: function(params: any) {
        return params[0].name + '<br/>Heart Rate: ' + params[0].value + ' BPM';
      }
    },
    grid: {
      left: '10%',
      right: '10%',
      top: '15%',
      bottom: '25%'
    }
  };

  // Steps Count (Bar Chart)
  const stepsData = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLabel: {
        fontSize: 10
      }
    },
    yAxis: {
      type: 'value',
      name: 'Steps',
      axisLabel: {
        fontSize: 10,
        formatter: function(value: number) {
          return (value / 1000) + 'k';
        }
      }
    },
    series: [{
      data: [8500, 9200, 7800, 10500, 8800, 12000, 9500],
      type: 'bar',
      itemStyle: {
        color: '#8B5CF6'
      },
      label: {
        show: true,
        position: 'top',
        formatter: function(params: any) {
          return (params.value / 1000).toFixed(1) + 'k';
        },
        fontSize: 9
      }
    }],
    tooltip: {
      trigger: 'axis',
      formatter: function(params: any) {
        return params[0].name + '<br/>Steps: ' + params[0].value.toLocaleString();
      }
    },
    grid: {
      left: '10%',
      right: '10%',
      top: '20%',
      bottom: '10%'
    }
  };

  return (
    <div className='space-y-4 sm:space-y-6 p-4 sm:p-6'>
      <div>
        <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white'>
          Dashboard
        </h1>
        <p className='text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1 sm:mt-2'>
          Track your health metrics and sleep patterns
        </p>
      </div>

      {/* Charts Grid */}
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6'>
        {/* Sleep Hours Bar Chart */}
        <div className='bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700'>
          <div className='p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
              Sleep Hours (Last 7 Days)
            </h3>
          </div>
          <div className='p-4 sm:p-6'>
            <ReactECharts 
              option={sleepHoursData} 
              style={{ height: '250px', width: '100%' }}
            />
          </div>
        </div>

        {/* Sleep Cycle Distribution */}
        <div className='bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700'>
          <div className='p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
              Sleep Cycle Distribution
            </h3>
          </div>
          <div className='p-4 sm:p-6'>
            <ReactECharts 
              option={sleepCycleData} 
              style={{ height: '350px', width: '100%' }}
            />
          </div>
        </div>

        {/* Heart Rate Line Chart */}
        <div className='bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700'>
          <div className='p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
              Heart Rate Trend (Today)
            </h3>
          </div>
          <div className='p-4 sm:p-6'>
            <ReactECharts 
              option={heartRateData} 
              style={{ height: '250px', width: '100%' }}
            />
          </div>
        </div>

        {/* Steps Bar Chart */}
        <div className='bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700'>
          <div className='p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
              Daily Steps Count
            </h3>
          </div>
          <div className='p-4 sm:p-6'>
            <ReactECharts 
              option={stepsData} 
              style={{ height: '250px', width: '100%' }}
            />
          </div>
        </div>
      </div>

      {/* Health Summary Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
        <div className='bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-700'>
          <h3 className='text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2'>
            Average Sleep
          </h3>
          <p className='text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400'>
            8.1h
          </p>
          <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1'>
            Last 7 days
          </p>
        </div>

        <div className='bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-700'>
          <h3 className='text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2'>
            Daily Steps
          </h3>
          <p className='text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400'>
            9,500
          </p>
          <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1'>
            Today&apos;s average
          </p>
        </div>

        <div className='bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-700 sm:col-span-2 lg:col-span-1'>
          <h3 className='text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2'>
            Heart Rate
          </h3>
          <p className='text-2xl sm:text-3xl font-bold text-red-600 dark:text-red-400'>
            75 BPM
          </p>
          <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1'>
            Resting average
          </p>
        </div>
      </div>
    </div>
  );
}

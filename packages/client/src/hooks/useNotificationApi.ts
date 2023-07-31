export const useNotificationApi = (score: number) => {
  const notifyUser = (score: number) => {
    const notification = new Notification('Поздравляем!', {
      body: `Ваш новый рекорд - ${score}`,
      icon: '/cheburashka.png',
    })

    setTimeout(() => {
      notification.close()
    }, 3000)
  }

  if ('Notification' in window) {
    Notification.requestPermission().then(
      (res: NotificationPermission): void => {
        // Обновить условие, после добавления функционала с рекордом
        if (res === 'granted' && score >= 0) {
          notifyUser(score)
        } else if (res === 'denied') {
          alert('Пожалуйста, разрешите уведомления')
        } else if (res === 'default') {
          alert('Пожалуйста, разрешите уведомления')
        }
      }
    )
  } else {
    alert('Уведомления не поддерживаются')
  }
}

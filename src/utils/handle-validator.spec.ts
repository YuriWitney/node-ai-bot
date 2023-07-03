import { type TurnContext } from 'botbuilder'
import { type PromptValidatorContext } from 'botbuilder-dialogs'
import { agePromptValidator } from './handle-validators'

const makeSut = (): (promptContext: PromptValidatorContext<number>) => Promise<boolean> => {
  return agePromptValidator
}

describe('handle-validators Tests', () => {
  describe('agePromptValidator Tests', () => {
    it('Should throw error if recognized is false', async () => {
      const falsyPromptContextMock: PromptValidatorContext<number> = {
        context: {
          _respondedRef: {
            responded: false
          },
          _turnState: {
            turn: {
              locale: 'en-US'
            }
          },
          _onSendActivities: [
          ],
          _onUpdateActivity: [
          ],
          _onDeleteActivity: [
          ],
          _turn: 'turn',
          _locale: 'locale',
          bufferedReplyActivities: [
          ],
          _activity: {
            channelData: {
              clientActivityID: '168701514225126mcfipbrtk',
              clientTimestamp: '2023-06-17T15:19:02.251Z'
            },
            text: '32',
            textFormat: 'plain',
            type: 'message',
            channelId: 'emulator',
            from: {
              id: 'caee0583-21c1-42bb-83c7-87941be12a07',
              name: 'User',
              role: 'user'
            },
            locale: 'pt-BR',
            localTimestamp: '2023-06-17T15:19:02.000Z',
            localTimezone: 'America/Sao_Paulo',
            timestamp: '2023-06-17T15:19:02.321Z',
            conversation: {
              id: '8e7dc190-0d13-11ee-8f04-a9eedd99663e|livechat'
            },
            id: '4a647210-0d22-11ee-8f04-a9eedd99663e',
            recipient: {
              id: '8e697640-0d13-11ee-9dd9-019b181ee68a',
              name: 'Bot',
              role: 'bot'
            },
            serviceUrl: 'http://localhost:61915',
            rawTimestamp: '2023-06-17T15:19:02.321Z',
            rawLocalTimestamp: '2023-06-17T12:19:02-03:00',
            callerId: null
          }
        } as unknown as TurnContext,
        recognized: {
          succeeded: false
        },
        state: {
          attemptCount: 1
        },
        options: {
          prompt: 'Por favor digite sua idade.',
          retryPrompt: 'O valor informado precisa ser maior que 0 e menor que 150.'
        },
        attemptCount: 1
      }

      const sut = makeSut()
      await expect(async () => { return await sut(falsyPromptContextMock) }).rejects.toThrow()
    })

    it('Should return true if recognized succeeded', () => {
      const promptContextMock: PromptValidatorContext<number> = {
        context: {
          _respondedRef: {
            responded: false
          },
          _turnState: {
            turn: {
              locale: 'en-US'
            }
          },
          _onSendActivities: [
          ],
          _onUpdateActivity: [
          ],
          _onDeleteActivity: [
          ],
          _turn: 'turn',
          _locale: 'locale',
          bufferedReplyActivities: [
          ],
          _activity: {
            channelData: {
              clientActivityID: '168701514225126mcfipbrtk',
              clientTimestamp: '2023-06-17T15:19:02.251Z'
            },
            text: '32',
            textFormat: 'plain',
            type: 'message',
            channelId: 'emulator',
            from: {
              id: 'caee0583-21c1-42bb-83c7-87941be12a07',
              name: 'User',
              role: 'user'
            },
            locale: 'pt-BR',
            localTimestamp: '2023-06-17T15:19:02.000Z',
            localTimezone: 'America/Sao_Paulo',
            timestamp: '2023-06-17T15:19:02.321Z',
            conversation: {
              id: '8e7dc190-0d13-11ee-8f04-a9eedd99663e|livechat'
            },
            id: '4a647210-0d22-11ee-8f04-a9eedd99663e',
            recipient: {
              id: '8e697640-0d13-11ee-9dd9-019b181ee68a',
              name: 'Bot',
              role: 'bot'
            },
            serviceUrl: 'http://localhost:61915',
            rawTimestamp: '2023-06-17T15:19:02.321Z',
            rawLocalTimestamp: '2023-06-17T12:19:02-03:00',
            callerId: null
          }
        } as unknown as TurnContext,
        recognized: {
          succeeded: true,
          value: 51
        },
        state: {
          attemptCount: 1
        },
        options: {
          prompt: 'Por favor digite sua idade.',
          retryPrompt: 'O valor informado precisa ser maior que 0 e menor que 150.'
        },
        attemptCount: 1
      }

      const sut = makeSut()
      const result = sut(promptContextMock)
      expect(result).toBeTruthy()
    })
  })
})

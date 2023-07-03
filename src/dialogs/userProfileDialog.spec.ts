import {
  TestAdapter,
  ConversationState,
  MemoryStorage,
  type TurnContext,
  type Activity
} from 'botbuilder'
import { DialogTurnStatus, DialogSet } from 'botbuilder-dialogs'
import * as HandleValidators from '../utils/handle-validators'

import { UserProfileDialog } from '../dialogs/userProfileDialog'

interface SpyTypes {
  agePromptValidatorSpy: jest.SpyInstance
}

const makeSpy = (): SpyTypes => {
  const agePromptValidatorSpy = jest.spyOn(HandleValidators, 'agePromptValidator')
  return {
    agePromptValidatorSpy
  }
}

describe('UserProfile Dialog Tests', function () {
  it('Should ask user transport preference', (done) => {
    const testData = setCommonData()

    const dialogs = new DialogSet(
      testData.auraDataAccesor.dialogStateAccessor
    )
    const testDialog: UserProfileDialog =
          new UserProfileDialog(testData.auraDataAccesor.dialogStateAccessor)
    dialogs.add(testDialog)

    const adapter = new TestAdapter(async (turnContext: TurnContext) => {
      const dc = await dialogs.createContext(turnContext)
      const results = await dc.continueDialog()
      if (results.status === DialogTurnStatus.empty) {
        await dc.beginDialog(UserProfileDialog.id)
      }
      await testData.conversationState.saveChanges(turnContext)
    })

    adapter
      .send('Olá')
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Por favor digite seu meio de transporte atual. (1) Carro, (2) Ônibus, or (3) Bicicleta')
      })
      .then(() => {
        done()
      })
      .catch((err: any) => done(err))
  })

  it('Should ask user name', (done) => {
    const testData = setCommonData()

    const dialogs = new DialogSet(
      testData.auraDataAccesor.dialogStateAccessor
    )
    const testDialog: UserProfileDialog =
          new UserProfileDialog(testData.auraDataAccesor.dialogStateAccessor)
    dialogs.add(testDialog)

    const adapter = new TestAdapter(async (turnContext: TurnContext) => {
      const dc = await dialogs.createContext(turnContext)
      const results = await dc.continueDialog()
      if (results.status === DialogTurnStatus.empty) {
        await dc.beginDialog(UserProfileDialog.id)
      }
      await testData.conversationState.saveChanges(turnContext)
    })

    adapter
      .send('Olá')
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Por favor digite seu meio de transporte atual. (1) Carro, (2) Ônibus, or (3) Bicicleta')
      })
      .send('Carro')
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Como você se chama?')
      })
      .then(() => {
        done()
      })
      .catch((err: any) => done(err))
  })

  it('Should thanks and ask if can get user age', (done) => {
    const testData = setCommonData()

    const dialogs = new DialogSet(
      testData.auraDataAccesor.dialogStateAccessor
    )
    const testDialog: UserProfileDialog =
          new UserProfileDialog(testData.auraDataAccesor.dialogStateAccessor)
    dialogs.add(testDialog)

    const adapter = new TestAdapter(async (turnContext: TurnContext) => {
      const dc = await dialogs.createContext(turnContext)
      const results = await dc.continueDialog()
      if (results.status === DialogTurnStatus.empty) {
        await dc.beginDialog(UserProfileDialog.id)
      }
      await testData.conversationState.saveChanges(turnContext)
    })

    adapter
      .send('Olá')
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Por favor digite seu meio de transporte atual. (1) Carro, (2) Ônibus, or (3) Bicicleta')
      })
      .send('Carro')
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Como você se chama?')
      })
      .send('Teste')
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Obrigado Teste.')
      })
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Você quer falar sua idade? (1) Sim or (2) Não')
      })
      .then(() => {
        done()
      })
      .catch((err: any) => done(err))
  })

  it('Should ask user age', (done) => {
    const testData = setCommonData()

    const dialogs = new DialogSet(
      testData.auraDataAccesor.dialogStateAccessor
    )
    const testDialog: UserProfileDialog =
          new UserProfileDialog(testData.auraDataAccesor.dialogStateAccessor)
    dialogs.add(testDialog)

    const adapter = new TestAdapter(async (turnContext: TurnContext) => {
      const dc = await dialogs.createContext(turnContext)
      const results = await dc.continueDialog()
      if (results.status === DialogTurnStatus.empty) {
        await dc.beginDialog(UserProfileDialog.id)
      }
      await testData.conversationState.saveChanges(turnContext)
    })

    adapter
      .send('Olá')
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Por favor digite seu meio de transporte atual. (1) Carro, (2) Ônibus, or (3) Bicicleta')
      })
      .send('Carro')
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Como você se chama?')
      })
      .send('Teste')
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Obrigado Teste.')
      })
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Você quer falar sua idade? (1) Sim or (2) Não')
      })
      .send('Sim')
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Por favor digite sua idade.')
      })
      .then(() => {
        done()
      })
      .catch((err: any) => done(err))
  })

  it('Should confirm the age', (done) => {
    const { agePromptValidatorSpy } = makeSpy()
    agePromptValidatorSpy.mockResolvedValueOnce(true)
    const testData = setCommonData()

    const dialogs = new DialogSet(
      testData.auraDataAccesor.dialogStateAccessor
    )
    const testDialog: UserProfileDialog =
          new UserProfileDialog(testData.auraDataAccesor.dialogStateAccessor)
    dialogs.add(testDialog)

    const adapter = new TestAdapter(async (turnContext: TurnContext) => {
      const dc = await dialogs.createContext(turnContext)
      const results = await dc.continueDialog()
      if (results.status === DialogTurnStatus.empty) {
        await dc.beginDialog(UserProfileDialog.id)
      }
      await testData.conversationState.saveChanges(turnContext)
    })

    adapter
      .send('Olá')
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Por favor digite seu meio de transporte atual. (1) Carro, (2) Ônibus, or (3) Bicicleta')
      })
      .send('Carro')
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Como você se chama?')
      })
      .send('Teste')
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Obrigado Teste.')
      })
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Você quer falar sua idade? (1) Sim or (2) Não')
      })
      .send('Sim')
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Por favor digite sua idade.')
      })
      .send('51')
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Tenho sua idade: 51.')
      })
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('É essa mesma? (1) Sim or (2) Não')
      })
      .then(() => {
        done()
      })
      .catch((err: any) => done(err))
  })

  it('Should summarize the steps', (done) => {
    const testData = setCommonData()

    const { agePromptValidatorSpy } = makeSpy()
    agePromptValidatorSpy.mockResolvedValueOnce(true)

    const dialogs = new DialogSet(
      testData.auraDataAccesor.dialogStateAccessor
    )
    const testDialog: UserProfileDialog =
          new UserProfileDialog(testData.auraDataAccesor.dialogStateAccessor)
    dialogs.add(testDialog)

    const adapter = new TestAdapter(async (turnContext: TurnContext) => {
      const dc = await dialogs.createContext(turnContext)
      const results = await dc.continueDialog()
      if (results.status === DialogTurnStatus.empty) {
        await dc.beginDialog(UserProfileDialog.id)
      }
      await testData.conversationState.saveChanges(turnContext)
    })

    adapter
      .send('Olá')
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Por favor digite seu meio de transporte atual. (1) Carro, (2) Ônibus, or (3) Bicicleta')
      })
      .send('Carro')
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Como você se chama?')
      })
      .send('Teste')
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Obrigado Teste.')
      })
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Você quer falar sua idade? (1) Sim or (2) Não')
      })
      .send('Sim')
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Por favor digite sua idade.')
      })
      .send('51')
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Tenho sua idade: 51.')
      })
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('É essa mesma? (1) Sim or (2) Não')
      })
      .send('Sim')
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Seu meio de transporte é Carro e seu nome é Teste. E idade 51.')
      })
      .then(() => {
        done()
      })
      .catch((err: any) => done(err))
  })

  it('Should not send the age', (done) => {
    const testData = setCommonData()

    const dialogs = new DialogSet(
      testData.auraDataAccesor.dialogStateAccessor
    )
    const testDialog: UserProfileDialog =
          new UserProfileDialog(testData.auraDataAccesor.dialogStateAccessor)
    dialogs.add(testDialog)

    const adapter = new TestAdapter(async (turnContext: TurnContext) => {
      const dc = await dialogs.createContext(turnContext)
      const results = await dc.continueDialog()
      if (results.status === DialogTurnStatus.empty) {
        await dc.beginDialog(UserProfileDialog.id)
      }
      await testData.conversationState.saveChanges(turnContext)
    })

    adapter
      .send('Olá')
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Por favor digite seu meio de transporte atual. (1) Carro, (2) Ônibus, or (3) Bicicleta')
      })
      .send('Carro')
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Como você se chama?')
      })
      .send('Teste')
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Obrigado Teste.')
      })
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Você quer falar sua idade? (1) Sim or (2) Não')
      })
      .send('Não')
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Idade não informada.')
      })
      .then(() => {
        done()
      })
      .catch((err: any) => done(err))
  })

  it('Should not confirm the age', (done) => {
    const testData = setCommonData()

    const { agePromptValidatorSpy } = makeSpy()
    agePromptValidatorSpy.mockResolvedValueOnce(true)

    const dialogs = new DialogSet(
      testData.auraDataAccesor.dialogStateAccessor
    )
    const testDialog: UserProfileDialog =
          new UserProfileDialog(testData.auraDataAccesor.dialogStateAccessor)
    dialogs.add(testDialog)

    const adapter = new TestAdapter(async (turnContext: TurnContext) => {
      const dc = await dialogs.createContext(turnContext)
      const results = await dc.continueDialog()
      if (results.status === DialogTurnStatus.empty) {
        await dc.beginDialog(UserProfileDialog.id)
      }
      await testData.conversationState.saveChanges(turnContext)
    })

    adapter
      .send('Olá')
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Por favor digite seu meio de transporte atual. (1) Carro, (2) Ônibus, or (3) Bicicleta')
      })
      .send('Carro')
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Como você se chama?')
      })
      .send('Teste')
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Obrigado Teste.')
      })
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Você quer falar sua idade? (1) Sim or (2) Não')
      })
      .send('Sim')
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Por favor digite sua idade.')
      })
      .send('51')
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Tenho sua idade: 51.')
      })
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('É essa mesma? (1) Sim or (2) Não')
      })
      .send('Não')
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Obrigado. Seus dados não serão mantidos.')
      })
      .then(() => {
        done()
      })
      .catch((err: any) => done(err))
  })

  it('Should not allow an invalid age', (done) => {
    const testData = setCommonData()

    const { agePromptValidatorSpy } = makeSpy()
    agePromptValidatorSpy.mockResolvedValueOnce(false)

    const dialogs = new DialogSet(
      testData.auraDataAccesor.dialogStateAccessor
    )
    const testDialog: UserProfileDialog =
          new UserProfileDialog(testData.auraDataAccesor.dialogStateAccessor)
    dialogs.add(testDialog)

    const adapter = new TestAdapter(async (turnContext: TurnContext) => {
      const dc = await dialogs.createContext(turnContext)
      const results = await dc.continueDialog()
      if (results.status === DialogTurnStatus.empty) {
        await dc.beginDialog(UserProfileDialog.id)
      }
      await testData.conversationState.saveChanges(turnContext)
    })

    adapter
      .send('Olá')
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Por favor digite seu meio de transporte atual. (1) Carro, (2) Ônibus, or (3) Bicicleta')
      })
      .send('Carro')
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Como você se chama?')
      })
      .send('Teste')
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Obrigado Teste.')
      })
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Você quer falar sua idade? (1) Sim or (2) Não')
      })
      .send('Sim')
      .assertReply((activity: Activity) => {
        const assertText = activity.text != null ? activity.text : null
        expect(assertText).toBe('Por favor digite sua idade.')
      })
      .send('bla bla bla')
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      .then(() => {
        done()
      })
      .catch((err: any) => {
        expect(err.message).toEqual('Valor não reconhecido')
        done()
      })
  })
})

function setCommonData (): any {
  const memoryStorage = new MemoryStorage()
  const conversationState = new ConversationState(memoryStorage)
  const auraDataAccesor = {
    dialogStateAccessor: conversationState.createProperty(
      'dialogStateAccessor'
    )
  }
  return {
    auraDataAccesor,
    conversationState
  }
}

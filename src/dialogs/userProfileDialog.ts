// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { type UserState } from 'botbuilder'
import {
  ChoiceFactory,
  ChoicePrompt,
  ComponentDialog,
  NumberPrompt,
  TextPrompt,
  WaterfallDialog,
  type WaterfallStepContext,
  type DialogTurnResult
} from 'botbuilder-dialogs'
import { type UserProfile } from '../userProfile'
import { agePromptValidator } from '../utils/handle-validators'

const CHOICE_PROMPT = 'CHOICE_PROMPT'
const NAME_PROMPT = 'NAME_PROMPT'
const NUMBER_PROMPT = 'NUMBER_PROMPT'
// const USER_PROFILE = 'USER_PROFILE'
const WATERFALL_DIALOG = 'WATERFALL_DIALOG'

export class UserProfileDialog extends ComponentDialog {
  public static id: string = 'user-profile'

  // private readonly userProfile: StatePropertyAccessor<UserProfile>

  constructor (userState: UserState) {
    super(UserProfileDialog.id)

    // this.userProfile = userState.createProperty(USER_PROFILE)

    this.addDialog(new TextPrompt(NAME_PROMPT))
    this.addDialog(new ChoicePrompt(CHOICE_PROMPT))
    this.addDialog(new NumberPrompt(NUMBER_PROMPT, agePromptValidator))

    this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
      this.transportStep.bind(this),
      this.nameStep.bind(this),
      this.nameConfirmStep.bind(this),
      this.ageStep.bind(this),
      this.confirmStep.bind(this),
      this.summaryStep.bind(this)
    ]))

    this.initialDialogId = WATERFALL_DIALOG
  }

  private async transportStep (stepContext: WaterfallStepContext): Promise<DialogTurnResult<any>> {
    // WaterfallStep always finishes with the end of the Waterfall or with another dialog; here it is a Prompt Dialog.
    // Running a prompt here means the next WaterfallStep will be run when the users response is received.
    return await stepContext.prompt(CHOICE_PROMPT, {
      choices: ChoiceFactory.toChoices(['Carro', 'Ônibus', 'Bicicleta']),
      prompt: 'Por favor digite seu meio de transporte atual.'
    })
  }

  private async nameStep (stepContext: WaterfallStepContext<UserProfile>): Promise<DialogTurnResult<any>> {
    stepContext.options.transport = stepContext.result.value
    return await stepContext.prompt(NAME_PROMPT, 'Como você se chama?')
  }

  private async nameConfirmStep (stepContext: WaterfallStepContext<UserProfile>): Promise<DialogTurnResult<any>> {
    stepContext.options.name = stepContext.result

    // We can send messages to the user at any point in the WaterfallStep.
    await stepContext.context.sendActivity(`Obrigado ${stepContext.result as string}.`)

    // WaterfallStep always finishes with the end of the Waterfall or with another dialog; here it is a Prompt Dialog.
    return await stepContext.prompt(CHOICE_PROMPT, {
      prompt: 'Você quer falar sua idade?',
      choices: ChoiceFactory.toChoices(['Sim', 'Não'])
    })
  }

  private async ageStep (stepContext: WaterfallStepContext): Promise<DialogTurnResult<any>> {
    if (stepContext.result.value === 'Sim') {
      // User said "yes" so we will be prompting for the age.
      // WaterfallStep always finishes with the end of the Waterfall or with another dialog, here it is a Prompt Dialog.
      const promptOptions = { prompt: 'Por favor digite sua idade.', retryPrompt: 'O valor informado precisa ser maior que 0 e menor que 150.' }

      return await stepContext.prompt(NUMBER_PROMPT, promptOptions)
    } else {
      // User said "no" so we will skip the next step. Give -1 as the age.
      return await stepContext.next(-1)
    }
  }

  private async confirmStep (stepContext: WaterfallStepContext<UserProfile>): Promise<DialogTurnResult<any>> {
    stepContext.options.age = stepContext.result

    const msg = stepContext.options.age === -1 ? 'Idade não informada.' : `Tenho sua idade: ${stepContext.options.age}.`

    // We can send messages to the user at any point in the WaterfallStep.
    await stepContext.context.sendActivity(msg)

    // WaterfallStep always finishes with the end of the Waterfall or with another dialog, here it is a Prompt Dialog.
    return await stepContext.prompt(CHOICE_PROMPT, {
      prompt: 'É essa mesma?',
      choices: ChoiceFactory.toChoices(['Sim', 'Não'])
    })
  }

  private async summaryStep (stepContext: WaterfallStepContext<UserProfile>): Promise<DialogTurnResult<any>> {
    if (stepContext.result.value === 'Sim') {
      const userProfile: UserProfile = stepContext.options

      let msg = `Seu meio de transporte é ${userProfile.transport} e seu nome é ${userProfile.name}.`
      if (userProfile.age !== -1) {
        msg += ` E idade ${userProfile.age}.`
      }

      await stepContext.context.sendActivity(msg)
    } else {
      await stepContext.context.sendActivity('Obrigado. Seus dados não serão mantidos.')
    }

    // WaterfallStep always finishes with the end of the Waterfall or with another dialog, here it is the end.
    return await stepContext.endDialog()
  }
}

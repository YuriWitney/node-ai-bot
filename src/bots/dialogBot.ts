// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ActivityHandler, type BotState, type ConversationState, type StatePropertyAccessor, type UserState } from 'botbuilder'
import { DialogSet, DialogTurnStatus, type Dialog, type DialogState } from 'botbuilder-dialogs'
import { UserProfileDialog } from '../dialogs/userProfileDialog'
export class DialogBot extends ActivityHandler {
  private readonly conversationState: BotState
  private readonly userState: BotState
  private readonly dialog: Dialog
  private readonly dialogState: StatePropertyAccessor<DialogState>
  /**
     *
     * @param {ConversationState} conversationState
     * @param {UserState} userState
     * @param {Dialog} dialog
     */
  constructor (conversationState: BotState, userState: BotState, dialog: Dialog) {
    super()
    if (!conversationState) throw new Error('[DialogBot]: Missing parameter. conversationState is required')
    if (!userState) throw new Error('[DialogBot]: Missing parameter. userState is required')
    if (!dialog) throw new Error('[DialogBot]: Missing parameter. dialog is required')

    this.conversationState = conversationState as ConversationState
    this.userState = userState as UserState
    this.dialog = dialog
    this.dialogState = this.conversationState.createProperty('DialogState')

    this.onMessage(async (context, next) => {
      console.log('Running dialog with Message Activity.')

      const dialogSet = new DialogSet(this.dialogState)
      dialogSet.add(this.dialog)

      context.activity.locale = 'pt-BR'
      const dialogContext = await dialogSet.createContext(context)
      const results = await dialogContext.continueDialog()
      if (results.status === DialogTurnStatus.empty) {
        await dialogContext.beginDialog(UserProfileDialog.id)
      }

      await next()
    })

    this.onDialog(async (context, next) => {
      // Save any state changes. The load happened during the execution of the Dialog.
      await this.conversationState.saveChanges(context, false)
      await this.userState.saveChanges(context, false)
      await next()
    })
  }
}

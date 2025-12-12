/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
// This file contains the configuration for your Copilot Studio connection
// Fill in all the required values below to connect to your Copilot

import { ConnectionSettings } from '@microsoft/agents-copilotstudio-client';

// Flag to enable debug mode, which will store the debug information in localStorage.
// Copilot Studio Client uses the "debug" library for logging (https://github.com/debug-js/debug?tab=readme-ov-file#browser-support).
if (typeof window !== 'undefined') {
  window.localStorage.debug = 'copilot-studio:*';
}

export const credSettings = new ConnectionSettings({
    // REQUIRED: App ID of the App Registration used to log in, this should be in the same tenant as the Copilot.
    appClientId: 'd41c113b-7894-4c4f-a2b2-5a251bb6e176',
    
    // REQUIRED: Tenant ID of the App Registration used to log in, this should be in the same tenant as the Copilot.
    tenantId: 'f6bf0d68-8c3c-4a25-a5d8-661cec987ce2',
    
    // Authority endpoint for the Azure AD login. Default is 'https://login.microsoftonline.com'.
    authority: 'https://login.microsoftonline.com',
    
    // REQUIRED: Environment ID of the environment with the Copilot Studio App.
    environmentId: '357edaba-04ce-e4aa-890c-e099a688c993',
    
    // REQUIRED: Schema Name of the Copilot to use.
    agentIdentifier: 'copilots_header_0bff2',
    
    // PowerPlatformCloud enum key. Leave undefined for default.
    cloud: undefined,
    
    // Power Platform API endpoint to use if Cloud is configured as "Other".
    customPowerPlatformCloud: undefined,
    
    // AgentType enum key. Leave undefined for default.
    copilotAgentType: undefined,
    
    // URL used to connect to the Copilot Studio service. Leave undefined for default.
    directConnectUrl: undefined,
    
    // Flag to use the "x-ms-d2e-experimental" header URL on subsequent calls to the Copilot Studio service.
    useExperimentalEndpoint: false
  });

  
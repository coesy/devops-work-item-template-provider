import { describe, expect, test } from '@jest/globals';
import { ModelGenerator } from './modelGenerator';
import { TemplatePartModelExistingType } from './templatePartModelExistingType';

Object.defineProperty(globalThis, 'crypto', {
  value: {
    randomUUID: () => 'UUID VALUE'
  }
});

describe('Model Generator', () => {

    const modelGenerator: ModelGenerator = new ModelGenerator();

    test('defaultTemplateModel returns expected model', () => {
        expect(modelGenerator.defaultTemplateModel().id).toBe(undefined);
        expect(modelGenerator.defaultTemplateModel().templateName).toBe('');
        expect(modelGenerator.defaultTemplateModel().description).toBe('');
        expect(modelGenerator.defaultTemplateModel().children.length).toBe(0);
        expect(modelGenerator.defaultTemplateModel().workItemDescription?.toApply).toBe(false);
        expect(modelGenerator.defaultTemplateModel().workItemDescription?.value).toBe('');
    });

    test('newTemplatePartModel when isExisting=true returns expected model', () => {
        expect(modelGenerator.newTemplatePartModel(true).id).toBe('UUID VALUE');
        expect(modelGenerator.newTemplatePartModel(true).isExisting).toBe(true);
        expect(modelGenerator.newTemplatePartModel(true).workItemNumber).toBe(-1);
        expect(modelGenerator.newTemplatePartModel(true).attributes.length).toBe(0);
        expect(modelGenerator.newTemplatePartModel(true).title).toBe('Title will be loaded in on save..');
        expect(modelGenerator.newTemplatePartModel(true).description).toBe('');
        expect(modelGenerator.newTemplatePartModel(true).copyType).toBe(TemplatePartModelExistingType.Link);
    });

    test('newTemplatePartModel when isExisting=false returns expected model', () => {
        expect(modelGenerator.newTemplatePartModel(true).id).toBe('UUID VALUE');
        expect(modelGenerator.newTemplatePartModel(false).isExisting).toBe(false);
        expect(modelGenerator.newTemplatePartModel(false).workItemNumber).toBe(-1);
        expect(modelGenerator.newTemplatePartModel(false).attributes.length).toBe(0);
        expect(modelGenerator.newTemplatePartModel(false).title).toBe('Example Title');
        expect(modelGenerator.newTemplatePartModel(false).description).toBe('');
        expect(modelGenerator.newTemplatePartModel(false).copyType).toBe(TemplatePartModelExistingType.NotApplicable);
    });
});
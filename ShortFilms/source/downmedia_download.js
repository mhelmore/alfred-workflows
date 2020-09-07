#!/usr/bin/osascript -l JavaScript

ObjC.import('stdlib') // For $.getenv
const app = Application.currentApplication()
app.includeStandardAdditions = true

function run(argv) {
  const media = argv[0]
  const url = argv[1]

  if (media != 'video' && media != 'audio') throw new Error('First argument needs to specify the type of media to download: "video" or "audio"')

  try {
    Application('com.runningwithcrayons.Alfred').runTrigger('download_' + media, { inWorkflow: 'com.vitorgalvao.alfred.downmedia', withArgument: url })
  } catch {
    if (app.displayDialog('The DownMedia Workflow is required for this action', {
      buttons: ['Cancel', 'Download DownMedia'],
      defaultButton: 'Download DownMedia',
      cancelButton: 'Cancel',
      withIcon: Path($.getenv('alfred_preferences') + '/workflows/' + $.getenv('alfred_workflow_uid') + '/icon.png')
    })) app.openLocation('https://raw.githubusercontent.com/vitorgalvao/alfred-workflows/master/DownMedia/DownMedia.alfredworkflow')
  }
}

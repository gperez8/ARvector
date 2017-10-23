/* global angular, document, Quill, window */
import { ImageImport } from '../../../../lib/quill/ImageImport';
import { ImageResize } from '../../../../lib/quill/ImageResize';

angular.module('app')
	.controller('mathEditorCtrl', ($scope, $rootScope) => {
		
		$rootScope.login = localStorage.getItem('token');
		$rootScope.rolUser = localStorage.getItem('rolUser');
		$rootScope.path = '/mathEditor';

		Quill.register('modules/imageImport', ImageImport);
		Quill.register('modules/imageResize', ImageResize);
		const toolbarOptions = [
			[{ header: [1, 2, 3, 4, 5, 6, false] }],
			[{ font: [] }],
			[{ size: ['small', false, 'large', 'huge'] }],
			['blockquote', 'code-block'],
			['bold', 'italic', 'underline', 'strike'],        // toggled buttons

            // custom button values
			[{ list: 'ordered' }, { list: 'bullet' }],
			[{ align: [] }],
			[{ script: 'sub' }, { script: 'super' }],      // superscript/subscript
			[{ indent: '-1' }, { indent: '+1' }],          // outdent/indent
			[{ direction: 'rtl' }],                         // text direction

			// custom dropdown
			[{ color: [] }, { background: [] }],
			['link', 'image', 'video', 'formula'],          // dropdown with defaults from theme
			['clean'],                                        // remove formatting button
		];

		const quill = new Quill('#editor', {
			theme: 'snow',
			modules: {
				formula: true,
				toolbar: toolbarOptions,
				history: {
					delay: 1000,
					maxStack: 50,
					userOnly: false,
				},
				imageImport: true,
				imageResize: {
					displaySize: true,
				},
			},
		});

		$scope.hola = () => {
			const remove = document.querySelector('.ql-toolbar');
			const editor = document.querySelector('#editor');
			const parent = remove.parentNode;

			parent.removeChild(remove);
			window.print();
			window.close();

			parent.insertBefore(remove, editor);
		};

		const node = document.getElementsByClassName("ql-toolbar ql-snow");
		node[0].setAttribute("style", "background: white");
	});
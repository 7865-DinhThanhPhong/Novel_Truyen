import React, { useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';

function DescriptionEditor({ setValue }) {
    const editorRef = useRef(null);

    useEffect(() => {
        if (editorRef.current) {
            // Đồng bộ với react-hook-form
            editorRef.current.on('change', () => {
                const content = editorRef.current.getContent();
                console.log('TinyMCE content:', content);
                setValue('description', content); // Cập nhật giá trị mô tả
            });
        }
    });
    console.log('TinyMCE content ---------:', editorRef.current?.getContent());
    return (
        <Editor
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue=""
            apiKey='hptar53vm45eb0tr6komvborwgl84uvg187w9o24vvzmnliq'
            init={{
                plugins: [
                    // Core editing features
                    'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                    // Your account includes a free trial of TinyMCE premium features
                    // Try the most popular premium features until Dec 22, 2024:
                    'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown',
                    // Early access to document converters
                    'importword', 'exportword', 'exportpdf'
                ],
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                tinycomments_mode: 'embedded',
                tinycomments_author: 'Author name',
                mergetags_list: [
                    { value: 'First.Name', title: 'First Name' },
                    { value: 'Email', title: 'Email' },
                ],
                ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
            }}
        />
    );
}

export default DescriptionEditor;
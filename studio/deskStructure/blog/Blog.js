import S from '@sanity/desk-tool/structure-builder'
import { FaRegListAlt } from 'react-icons/fa'
import EditIcon from 'part:@sanity/base/edit-icon'
import EyeIcon from 'part:@sanity/base/eye-icon'
// import SeoPreview from '../../components/previews/seo/seo-preview'
// import IframePreview from '../../components/iframe/IframePreview'
// import { localURL, remoteURL } from '../../constants'

// const previewURL =
//   window.location.hostname === 'localhost' ? localURL : remoteURL
export default S.listItem()
  .title('Blog')
  .icon(FaRegListAlt)
  .child(
    S.list()
      .title('Blog')
      .items([
        S.listItem()
          .title('Tags')
          .schemaType('postCategory')
          .child(
            S.documentTypeList('postCategory')
              .title('Tags')
              .child(documentId =>
                S.document()
                  .documentId(documentId)
                  .schemaType('postCategory')
              )
          ),

        S.listItem()
          .title('Blog Post')
          .schemaType('post')
          .child(
            S.documentTypeList('post')
              .title('Tags')
              .child(documentId =>
                S.document()
                  .documentId(documentId)
                  .schemaType('post')
                  .views([
                    S.view.form().icon(EditIcon),            
                  ])
              )
          )
      ])
  )

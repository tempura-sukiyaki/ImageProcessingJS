function loadImage( imageBitmap )
  {
    const canvas = document.createElement( 'canvas' );
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;

    const context = canvas.getContext( '2d' );
    context.drawImage( imageBitmap, 0, 0 );

    const imageData = context.getImageData( 0, 0, canvas.width, canvas.height );
    imageData.data.forEach( ( value, index, array ) =>
      { array[ index ] = value * 2 < 0xff ? 0x00 : 0xff; }
    );
    context.putImageData( imageData, 0, 0 );

    document.getElementById( 'result' ).src = canvas.toDataURL( 'image/png' );
  }

function changeFile( event )
  {
    if ( event.target.files.length )
      { createImageBitmap( event.target.files[ 0 ] ).then( loadImage ); }
    else
      { document.getElementById( 'result' ).src = ''; }
  }

/*
// <input onchange> を使用しない場合
document.addEventListener( 'DOMContentLoaded', event =>
  {
    document.getElementById( 'file' ).addEventListener( 'change', changeFile );
  }
);
*/

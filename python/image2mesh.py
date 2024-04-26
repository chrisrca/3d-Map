import bpy
import bmesh
from mathutils import Vector

# Path to your image - update this with the correct path
image_path = "C:\\Users\\goali\\Downloads\\floor.png"

# Load the image into Blender's image data block, check if it's already loaded
if image_path in bpy.data.images:
    img = bpy.data.images[image_path]
else:
    img = bpy.data.images.load(image_path)

# Prepare a new mesh and object
mesh = bpy.data.meshes.new("CustomMesh")
obj = bpy.data.objects.new("CustomObject", mesh)
bpy.context.collection.objects.link(obj)

bm = bmesh.new()

# Pixel data
pxs = list(img.pixels)
w = img.size[0]
h = img.size[1]
scale = 0.05  # Scale factor for the mesh size

# Map for storing vertices for each pixel
vertex_map = {}

# Create vertices where alpha is greater than a threshold
threshold = 0.1
for y in range(h):
    for x in range(w):
        idx = (y * w + x) * 4
        rgba = pxs[idx:idx+4]
        if rgba[3] > threshold:  # Check alpha value
            # Create a vertex at (x, y) and store in map
            vertex = bm.verts.new((x * scale, y * scale, 0))
            vertex_map[x, y] = vertex

# Ensure all vertices are linked to a single mesh
bm.verts.ensure_lookup_table()
bm.edges.ensure_lookup_table()

# Create grid faces
for y in range(h-1):
    for x in range(w-1):
        # Ensure all four vertices for a face exist before creating it
        if (x, y) in vertex_map and (x+1, y) in vertex_map and (x+1, y+1) in vertex_map and (x, y+1) in vertex_map:
            v1 = vertex_map[x, y]
            v2 = vertex_map[x+1, y]
            v3 = vertex_map[x+1, y+1]
            v4 = vertex_map[x, y+1]
            bm.faces.new((v1, v2, v3, v4))

# Update the bmesh and mesh
bm.to_mesh(mesh)
bm.free()

# Set location to center
obj.location = (-w * scale / 2, -h * scale / 2, 0)
